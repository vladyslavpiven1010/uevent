import { Entity } from './shared/interfaces';
import * as moment from 'moment';

/**
 * Entity interface that represents comment.
 */
export interface Comment extends Entity {
  user_id: number;
  event_id: number;
  reply_to_id?: number;
  content: string;
  created_at: Date;
  deleted_at?: Date;
}