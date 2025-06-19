import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(LoggingInterceptor) // Apply logging to all user routes
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user.
   * POST /users
   * @param createUserDto The data for creating the user.
   * @returns The newly created user.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Retrieves all users.
   * GET /users
   * @returns A list of all users.
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Retrieves a single user by ID.
   * GET /users/:id
   * @param id The ID of the user.
   * @returns The user with the given ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  /**
   * Updates an existing user.
   * PATCH /users/:id
   * @param id The ID of the user to update.
   * @param updateUserDto The data for updating the user.
   * @returns The updated user.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * Removes a user by ID.
   * DELETE /users/:id
   * @param id The ID of the user to remove.
   * @returns A confirmation of deletion.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
