import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScpiUnitsModule } from './scpi/scpi.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'scpi-nestjs-api',
      // entities: [User, ScpiUnit, Subscription],
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production and use migrations
      logging: ['error', 'warn', 'schema'], // Helps to see more TypeORM logs
    }),
    UsersModule,
    ScpiUnitsModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
