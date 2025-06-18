import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScpiUnit } from './entities/scpi.entity';
import { ScpiController } from './scpi.controller';
import { ScpiUnitsService } from './scpi.service';

@Module({
  controllers: [ScpiController],
  imports: [TypeOrmModule.forFeature([ScpiUnit])],
  providers: [ScpiUnitsService],
  exports: [ScpiUnitsService],
})
export class ScpiUnitsModule {}
