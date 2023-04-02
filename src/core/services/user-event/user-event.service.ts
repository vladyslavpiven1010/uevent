import { IDataClient, IDataProvider } from 'src/core/abstracts';
import { UserEvent } from 'src/core/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataClient, ITransactable, Transaction } from '../../utils';
import { CreateUserEventDto, UpdateUserEventDto } from './dtos';
import { QueryOptions } from 'src/core/abstracts';

/**
 * Class that represents userEvent service. It contains business logic.
 */
@Injectable()
export class UserEventService implements ITransactable {
  constructor(public _dataProvider: IDataProvider) {}

  @Transaction()
  public async createUserEvent(userEventDto: CreateUserEventDto, @DataClient() dataClient?: IDataClient): Promise<UserEvent> {
    const userEventDraft: UserEvent = {
      ...userEventDto
    };
    const userEvent = await dataClient.userEvent.create(userEventDraft);
    return userEvent;
  }

  @Transaction()
  public async getUserEvent(userEventId: number, @DataClient() dataClient?: IDataClient): Promise<UserEvent> {
    const userEvent = await dataClient.userEvent.findById(userEventId);
    if (!userEvent) throw new NotFoundException('There is no such userEvent with this ID');
    return userEvent;
  }

  @Transaction()
  public async getUserEventByOption(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<UserEvent> {
    const userEvent = await dataClient.userEvent.findOne(options)
    if (!userEvent) throw new NotFoundException('There is no such userEvent with this option');
    return userEvent;
  }

  @Transaction()
  public async getUserEvents(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<UserEvent[]> {
    const userEvent = await dataClient.userEvent.findAll(options);
    if (!userEvent) throw new NotFoundException('There is no such userEvent with this options');
    return userEvent;
  }

  @Transaction()
  public async updateUserEvent(userEventId: number, userEventDto: UpdateUserEventDto, @DataClient() dataClient?: IDataClient): Promise<UserEvent> {
    const userEvent = await dataClient.userEvent.updateById(userEventId, userEventDto);
    if (!userEvent) throw new NotFoundException('There is no such userEvent with this ID');
    return userEvent;
  }

  @Transaction()
  public async updateUserEvents(options: QueryOptions, userEventDto: UpdateUserEventDto, @DataClient() dataClient?: IDataClient): Promise<UserEvent[]> {
    const userEvent = await dataClient.userEvent.updateAll(options, userEventDto);
    if (!userEvent) throw new NotFoundException('There is no such userEvent with this options');
    return userEvent;
  }
}
