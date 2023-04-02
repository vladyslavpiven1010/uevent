import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents user and event.
 */
export interface UserEvent extends Entity {
  userId: number;
  eventId: number;
  isReceivingPost: boolean;
  isReceivingComment: boolean;
}