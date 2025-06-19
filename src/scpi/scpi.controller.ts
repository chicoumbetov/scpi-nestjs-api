import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

import { CreateScpiUnitDto } from './dto/create-scpi.dto';
import { ScpiUnit } from './entities/scpi.entity';
import { ScpiUnitsService } from './scpi.service';

@Controller('scpi-units')
@UseInterceptors(LoggingInterceptor)
export class ScpiUnitsController {
  constructor(private readonly scpiUnitsService: ScpiUnitsService) {}

  /**
   * Creates a new SCPI unit.
   * POST /scpi-units
   * @param createScpiUnitDto The data for creating the SCPI unit.
   * @returns The newly created SCPI unit.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createScpiUnitDto: CreateScpiUnitDto): Promise<ScpiUnit> {
    return this.scpiUnitsService.create(createScpiUnitDto);
  }

  /**
   * Retrieves all SCPI units.
   * GET /scpi-units
   * @returns A list of all SCPI units.
   */
  @Get()
  findAll(): Promise<ScpiUnit[]> {
    return this.scpiUnitsService.findAll();
  }

  /**
   * Retrieves a single SCPI unit by ID.
   * GET /scpi-units/:id
   * @param id The ID of the SCPI unit.
   * @returns The SCPI unit with the given ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ScpiUnit> {
    return this.scpiUnitsService.findOne(+id);
  }
}
