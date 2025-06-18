import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScpiUnit } from './entities/scpi.entity';

@Injectable()
export class ScpiUnitsService {
  constructor(
    @InjectRepository(ScpiUnit)
    private scpiUnitsRepository: Repository<ScpiUnit>,
  ) {}

  async findOne(id: number): Promise<ScpiUnit> {
    const scpiUnit = await this.scpiUnitsRepository.findOne({ where: { id } });
    if (!scpiUnit) {
      throw new NotFoundException(`SCPI Unit with ID ${id} not found.`);
    }
    return scpiUnit;
  }

  async createScpiUnit(name: string, price: number): Promise<ScpiUnit> {
    const newUnit = this.scpiUnitsRepository.create({
      name,
      pricePerUnit: price,
    });
    return this.scpiUnitsRepository.save(newUnit);
  }
}
