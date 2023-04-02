import { Test, TestingModule } from '@nestjs/testing';
import { CompanyUserController } from './company-user.controller';

describe('CompanyUserController', () => {
  let controller: CompanyUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyUserController],
    }).compile();

    controller = module.get<CompanyUserController>(CompanyUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
