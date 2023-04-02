import { IDataClient, IDataProvider } from 'src/core/abstracts';
import { Category } from 'src/core/entities';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataClient, ITransactable, Transaction } from '../../utils';
import { ConfigService } from '@nestjs/config';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

/**
 * Class that represents category service. It contains business logic.
 */
@Injectable()
export class CategoryService implements ITransactable {
  constructor(public _dataProvider: IDataProvider) {}

  /**
   * Create category.
   * @param name
   * @returns
   */
  @Transaction()
  public async createCategory(name: string, @DataClient() dataClient?: IDataClient): Promise<Category> {
    const categoryDraft: Category = {
      name: name
    };
    const category = await dataClient.category.create(categoryDraft);
    return category;
  }

  @Transaction()
  public async getCategory(categoryId: number, @DataClient() dataClient?: IDataClient): Promise<Category> {
    const category = await dataClient.category.findById(categoryId);
    if (!category) throw new NotFoundException('There is no such category with this ID');
    return category;
  }

  @Transaction()
  public async getAllCategories(@DataClient() dataClient?: IDataClient): Promise<Category[]> {
    const category = await dataClient.category.findAll({});
    return category;
  }

  @Transaction()
  public async updateCategory(categoryId: number, categoryUpdate: UpdateCategoryDto, @DataClient() dataClient?: IDataClient): Promise<Category> {
    const category = await dataClient.category.updateById(categoryId, categoryUpdate);
    return category;
  }
}
