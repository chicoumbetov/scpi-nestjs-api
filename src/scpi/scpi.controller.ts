import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScpiService } from './scpi.service';
import { CreateScpiDto } from './dto/create-scpi.dto';
import { UpdateScpiDto } from './dto/update-scpi.dto';

@Controller('scpi')
export class ScpiController {
  constructor(private readonly scpiService: ScpiService) {}

  @Post()
  create(@Body() createScpiDto: CreateScpiDto) {
    return this.scpiService.create(createScpiDto);
  }

  @Get()
  findAll() {
    return this.scpiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scpiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScpiDto: UpdateScpiDto) {
    return this.scpiService.update(+id, updateScpiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scpiService.remove(+id);
  }
}
