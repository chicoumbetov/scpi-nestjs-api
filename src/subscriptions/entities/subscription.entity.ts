import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScpiUnit } from '../../scpi/entities/scpi.entity';
import { User } from '../../users/entities/user.entity';

export enum SubscriptionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @ManyToOne(() => ScpiUnit)
  scpiUnit: ScpiUnit;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountPaid: number; // Total amount paid for this subscription

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitsAcquired: number; // Number of units acquired

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  status: SubscriptionStatus;

  @Column({ nullable: true })
  failureReason: string;

  @CreateDateColumn()
  createdAt: Date;
}
