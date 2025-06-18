import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ScpiModule } from './scpi/scpi.module';

@Module({
  imports: [UsersModule, ScpiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
