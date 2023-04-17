import { IDataClient, IDataProvider } from 'src/core/abstracts';
import { Comment } from 'src/core/entities';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataClient, ITransactable, Transaction } from '../../utils';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { QueryOptions } from 'src/core/abstracts';

/**
 * Class that represents comment service. It contains business logic.
 */
@Injectable()
export class CommentService implements ITransactable {
  constructor(public _dataProvider: IDataProvider) {}

  @Transaction()
  public async createComment(commentDto: CreateCommentDto, @DataClient() dataClient?: IDataClient): Promise<Comment> {
    const commentDraft: Comment = {
      ...commentDto,
      created_at: new Date(),
      deleted_at: null
    };
    const comment = await dataClient.comment.create(commentDraft);
    return comment;
  }

  @Transaction()
  public async getComment(commentId: number, @DataClient() dataClient?: IDataClient): Promise<Comment> {
    const comment = await dataClient.comment.findById(commentId);
    if (!comment) throw new NotFoundException('There is no such comment with this ID');
    return comment;
  }

  @Transaction()
  public async getCommentByOption(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Comment> {
    const comment = await dataClient.comment.findOne(options)
    if (!comment) throw new NotFoundException('There is no such comment with this option');
    return comment;
  }

  @Transaction()
  public async getComments(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Comment[]> {
    const comment = await dataClient.comment.findAll(options);
    if (!comment) throw new NotFoundException('There is no such comment with this options');
    return comment;
  }

  @Transaction()
  public async updateComment(commentId: number, commentDto: UpdateCommentDto, @DataClient() dataClient?: IDataClient): Promise<Comment> {
    const comment = await dataClient.comment.updateById(commentId, commentDto);
    if (!comment) throw new NotFoundException('There is no such comment with this ID');
    return comment;
  }

  @Transaction()
  public async updateComments(options: QueryOptions, commentDto: UpdateCommentDto, @DataClient() dataClient?: IDataClient): Promise<Comment[]> {
    const comment = await dataClient.comment.updateAll(options, commentDto);
    if (!comment) throw new NotFoundException('There is no such comment with this options');
    return comment;
  }
}
