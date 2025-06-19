import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateScpiUnitDto } from './dto/create-scpi.dto';
import { ScpiUnit } from './entities/scpi.entity';

@Injectable()
export class ScpiUnitsService {
  constructor(
    @InjectRepository(ScpiUnit)
    private scpiUnitsRepository: Repository<ScpiUnit>,
  ) {}

  /**
   * Creates a new SCPI unit.
   * @param createScpiUnitDto Data for creating the SCPI unit.
   * @returns The newly created SCPI unit.
   */
  async create(createScpiUnitDto: CreateScpiUnitDto): Promise<ScpiUnit> {
    const newUnit = this.scpiUnitsRepository.create({
      name: createScpiUnitDto.name,
      pricePerUnit: createScpiUnitDto.price,
      isActive: true, // Default to active when created
    });
    return this.scpiUnitsRepository.save(newUnit);
  }

  /**
   * Finds all SCPI units.
   * @returns A list of all SCPI units.
   */
  async findAll(): Promise<ScpiUnit[]> {
    return this.scpiUnitsRepository.find();
  }

  /**
   * Finds a single SCPI unit by ID.
   * @param id The ID of the SCPI unit.
   * @returns The found SCPI unit.
   * @throws NotFoundException if the SCPI unit is not found.
   */
  async findOne(id: number): Promise<ScpiUnit> {
    const scpiUnit = await this.scpiUnitsRepository.findOne({ where: { id } });
    if (!scpiUnit) {
      throw new NotFoundException(`SCPI Unit with ID ${id} not found.`);
    }
    return scpiUnit;
  }
}
