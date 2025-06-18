import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scpi_units')
export class ScpiUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., "Iroko Zen"

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerUnit: number; // Current price of one SCPI unit

  @Column({ default: true })
  isActive: boolean;
}
