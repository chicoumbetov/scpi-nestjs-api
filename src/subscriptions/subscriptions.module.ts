import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScpiUnitsModule } from 'src/scpi/scpi.module';
import { UsersModule } from 'src/users/users.module';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    UsersModule, // to use UsersService
    ScpiUnitsModule, // to use ScpiUnitsService
  ],
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
})
export class SubscriptionsModule {}
