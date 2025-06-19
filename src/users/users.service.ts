import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * @param createUserDto Data for creating the user.
   * @returns The newly created user.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({
      email: createUserDto.email,
      balance: createUserDto.initialBalance,
      scpiUnitsOwned: 0,
    });
    return this.usersRepository.save(newUser);
  }

  /**
   * Finds all users.
   * @returns A list of all users.
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Finds a single user by ID.
   * @param id The ID of the user.
   * @returns The found user.
   * @throws NotFoundException if the user is not found.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  /**
   * Updates an existing user.
   * @param id The ID of the user to update.
   * @param updateUserDto Data for updating the user.
   * @returns The updated user.
   * @throws NotFoundException if the user is not found.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Ensure user exists
    this.usersRepository.merge(user, updateUserDto); // Merge updates
    return this.usersRepository.save(user);
  }

  /**
   * Removes a user by ID.
   * @param id The ID of the user to remove.
   * @returns A Promise that resolves when the user is deleted.
   * @throws NotFoundException if the user is not found.
   */
  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }

  /**
   * Atomically increments/decrements a user's balance.
   * Used internally by transaction logic.
   * @param userId The ID of the user.
   * @param amount The amount to add (positive) or subtract (negative).
   */
  async updateBalance(userId: number, amount: number): Promise<void> {
    await this.usersRepository.increment({ id: userId }, 'balance', amount);
  }

  /**
   * Atomically increments/decrements a user's SCPI units owned.
   * Used internally by transaction logic.
   * @param userId The ID of the user.
   * @param units The number of units to add (positive) or subtract (negative).
   */
  async updateScpiUnits(userId: number, units: number): Promise<void> {
    await this.usersRepository.increment(
      { id: userId },
      'scpiUnitsOwned',
      units,
    );
  }

  /**
   * Saves a user entity. Used for saving changes from transaction logic.
   * @param user The user entity to save.
   * @returns The saved user entity.
   */
  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
