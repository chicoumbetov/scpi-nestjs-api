import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async updateBalance(userId: number, amount: number): Promise<void> {
    await this.usersRepository.increment({ id: userId }, 'balance', amount);
  }

  async updateScpiUnits(userId: number, units: number): Promise<void> {
    await this.usersRepository.increment(
      { id: userId },
      'scpiUnitsOwned',
      units,
    );
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async createUser(email: string, initialBalance: number): Promise<User> {
    const newUser = this.usersRepository.create({
      email,
      balance: initialBalance,
      scpiUnitsOwned: 0,
    });
    return this.usersRepository.save(newUser);
  }
}
