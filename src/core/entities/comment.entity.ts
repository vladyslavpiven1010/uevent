import { Entity } from './shared/interfaces';
import * as moment from 'moment';

/**
 * Entity interface that represents comment.
 */
export interface Comment extends Entity {
  userId: number;
  eventId: number;
  replyToId: number;
  content: string;
  createdAt: Date;
  deletedAt: Date;
}