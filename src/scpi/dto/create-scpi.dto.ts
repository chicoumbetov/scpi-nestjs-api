import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateScpiUnitDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number; // Renamed to price for consistency with service's argument
}
