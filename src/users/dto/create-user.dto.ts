import { IsEmail, IsNumber, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @IsPositive()
  initialBalance: number;
}
