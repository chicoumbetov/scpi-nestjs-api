import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm'; // Import DataSource for transactions

import { UsersService } from '../users/users.service';

import { ScpiUnit } from 'src/scpi/entities/scpi.entity';
import { ScpiUnitsService } from 'src/scpi/scpi.service';
import { User } from 'src/users/entities/user.entity';
import {
  Subscription,
  SubscriptionStatus,
} from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    private usersService: UsersService,
    private scpiUnitsService: ScpiUnitsService,
    private dataSource: DataSource, // Inject DataSource
  ) {}

  async subscribeToScpi(
    userId: number,
    scpiUnitId: number,
    desiredUnits: number,
  ): Promise<Subscription> {
    // Start a new query runner for the transaction
    const queryRunner = this.dataSource.createQueryRunner();
    // Establish a real database connection using our query runner
    await queryRunner.connect();
    await queryRunner.startTransaction();
    this.logger.log(
      `Transaction started for user ${userId} and SCPI unit ${scpiUnitId}`,
    );

    let newSubscription: Subscription | undefined;

    try {
      // 1. Fetch user and SCPI unit within the transaction
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
        lock: { mode: 'pessimistic_write' },
      }); // Use FOR UPDATE lock for user
      const scpiUnit = await queryRunner.manager.findOne(ScpiUnit, {
        where: { id: scpiUnitId },
      });

      if (!user) {
        throw new BadRequestException('User not found.');
      }
      if (!scpiUnit || !scpiUnit.isActive) {
        throw new BadRequestException('SCPI Unit not found or is inactive.');
      }
      if (desiredUnits <= 0) {
        throw new BadRequestException('Desired units must be positive.');
      }

      const totalCost = desiredUnits * scpiUnit.pricePerUnit;

      if (user.balance < totalCost) {
        throw new BadRequestException('Insufficient balance.');
      }

      // 2. Create pending subscription record
      newSubscription = this.subscriptionsRepository.create({
        user: user, // Link to the user object
        scpiUnit: scpiUnit, // Link to the SCPI unit object
        amountPaid: totalCost,
        unitsAcquired: desiredUnits,
        status: SubscriptionStatus.PENDING,
      });
      await queryRunner.manager.save(Subscription, newSubscription);
      this.logger.log(`Pending subscription ${newSubscription.id} created.`);

      // 3. Deduct amount from user's balance
      user.balance -= totalCost;
      await queryRunner.manager.save(User, user); // Save updated user balance
      this.logger.log(`Deducted ${totalCost} from user ${userId} balance.`);

      // 4. Update user's SCPI units owned
      user.scpiUnitsOwned += desiredUnits;
      await queryRunner.manager.save(User, user); // Save updated user SCPI units
      this.logger.log(`Added ${desiredUnits} SCPI units to user ${userId}.`);

      // 5. Update subscription status to COMPLETED
      newSubscription.status = SubscriptionStatus.COMPLETED;
      await queryRunner.manager.save(Subscription, newSubscription);
      this.logger.log(
        `Subscription ${newSubscription.id} marked as COMPLETED.`,
      );

      // Commit the transaction
      await queryRunner.commitTransaction();
      this.logger.log(
        `Transaction committed successfully for subscription ${newSubscription.id}.`,
      );

      return newSubscription;
    } catch (err) {
      // If any error occurs, rollback the transaction
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Transaction rolled back for user ${userId}, reason: ${err.message}`,
      );

      // Update subscription status to FAILED if it was created
      if (newSubscription && newSubscription.id) {
        newSubscription.status = SubscriptionStatus.FAILED;
        newSubscription.failureReason = err.message;
        await this.subscriptionsRepository.save(newSubscription); // Use default repository to save outside the rolled back transaction
        this.logger.log(`Subscription ${newSubscription.id} marked as FAILED.`);
      }

      // Re-throw the error to be handled by the controller/global exception filter
      throw err;
    } finally {
      // Release the query runner which is not needed anymore
      await queryRunner.release();
      this.logger.log(`Query runner released for user ${userId}.`);
    }
  }
}
