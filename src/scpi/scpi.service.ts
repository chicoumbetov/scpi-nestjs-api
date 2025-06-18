import { Injectable } from '@nestjs/common';
import { CreateScpiDto } from './dto/create-scpi.dto';
import { UpdateScpiDto } from './dto/update-scpi.dto';

@Injectable()
export class ScpiService {
  create(createScpiDto: CreateScpiDto) {
    return 'This action adds a new scpi';
  }

  findAll() {
    return `This action returns all scpi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scpi`;
  }

  update(id: number, updateScpiDto: UpdateScpiDto) {
    return `This action updates a #${id} scpi`;
  }

  remove(id: number) {
    return `This action removes a #${id} scpi`;
  }
}
