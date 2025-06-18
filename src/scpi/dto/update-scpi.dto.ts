import { PartialType } from '@nestjs/mapped-types';
import { CreateScpiDto } from './create-scpi.dto';

export class UpdateScpiDto extends PartialType(CreateScpiDto) {}
