import { Test, TestingModule } from '@nestjs/testing';
import { ScpiController } from './scpi.controller';
import { ScpiService } from './scpi.service';

describe('ScpiController', () => {
  let controller: ScpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScpiController],
      providers: [ScpiService],
    }).compile();

    controller = module.get<ScpiController>(ScpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
