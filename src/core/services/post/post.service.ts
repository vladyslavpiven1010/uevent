import { IDataClient, IDataProvider } from 'src/core/abstracts';
import { Post } from 'src/core/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataClient, ITransactable, Transaction } from '../../utils';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { QueryOptions } from 'src/core/abstracts';

/**
 * Class that represents post service. It contains business logic.
 */
@Injectable()
export class PostService implements ITransactable {
  constructor(public _dataProvider: IDataProvider) {}

  @Transaction()
  public async createPost(postDto: CreatePostDto, @DataClient() dataClient?: IDataClient): Promise<Post> {
    const postDraft: Post = {
      ...postDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };
    const post = await dataClient.post.create(postDraft);
    return post;
  }

  @Transaction()
  public async getPost(postId: number, @DataClient() dataClient?: IDataClient): Promise<Post> {
    const post = await dataClient.post.findById(postId);
    if (!post) throw new NotFoundException('There is no such post with this ID');
    return post;
  }

  @Transaction()
  public async getPostByOption(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Post> {
    const post = await dataClient.post.findOne(options)
    if (!post) throw new NotFoundException('There is no such post with this option');
    return post;
  }

  @Transaction()
  public async getPosts(options: QueryOptions, @DataClient() dataClient?: IDataClient): Promise<Post[]> {
    const post = await dataClient.post.findAll(options);
    if (!post) throw new NotFoundException('There is no such post with this options');
    return post;
  }

  @Transaction()
  public async updatePost(postId: number, postDto: UpdatePostDto, @DataClient() dataClient?: IDataClient): Promise<Post> {
    const post = await dataClient.post.updateById(postId, postDto);
    if (!post) throw new NotFoundException('There is no such post with this ID');
    return post;
  }

  @Transaction()
  public async updatePosts(options: QueryOptions, postDto: UpdatePostDto, @DataClient() dataClient?: IDataClient): Promise<Post[]> {
    const post = await dataClient.post.updateAll(options, postDto);
    if (!post) throw new NotFoundException('There is no such post with this options');
    return post;
  }
}
