import { Test, TestingModule } from '@nestjs/testing';
import { ScpiService } from './scpi.service';

describe('ScpiService', () => {
  let service: ScpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScpiService],
    }).compile();

    service = module.get<ScpiService>(ScpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
