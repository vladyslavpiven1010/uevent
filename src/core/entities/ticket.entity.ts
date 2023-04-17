import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents ticket.
 */
export interface Ticket extends Entity {
  user_id: number;
  event_id: number;
  uuid: string;
}