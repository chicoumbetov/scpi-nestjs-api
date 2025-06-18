import { Module } from '@nestjs/common';
import { ScpiService } from './scpi.service';
import { ScpiController } from './scpi.controller';

@Module({
  controllers: [ScpiController],
  providers: [ScpiService],
})
export class ScpiModule {}
