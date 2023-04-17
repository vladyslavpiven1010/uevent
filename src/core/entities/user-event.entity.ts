import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents user and event.
 */
export interface UserEvent extends Entity {
  user_id: number;
  event_id: number;
  is_receiving_post: boolean;
  is_receiving_comment: boolean;
}