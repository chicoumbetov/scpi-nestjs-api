import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  balance?: number; // Allows updating balance directly (e.g., for admin adjustments)

  @IsOptional()
  @IsNumber()
  @IsPositive()
  scpiUnitsOwned?: number; // Allows updating units directly (e.g., for admin adjustments)

  @IsOptional()
  @IsEmail()
  email?: string;
}
