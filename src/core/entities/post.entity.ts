import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents post.
 */
export interface Post extends Entity {
  eventId: number;
  imageUrl?: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}