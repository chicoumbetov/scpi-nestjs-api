import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ScpiModule } from './scpi/scpi.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [UsersModule, ScpiModule, SubscriptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
