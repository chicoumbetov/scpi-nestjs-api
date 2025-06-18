import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0.0 })
  balance: number; // User's wallet balance

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0.0 })
  scpiUnitsOwned: number; // Number of SCPI units user owns

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
