import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents post.
 */
export interface Post extends Entity {
  event_id: number;
  image_url?: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}