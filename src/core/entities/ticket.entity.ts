import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents ticket.
 */
export interface Ticket extends Entity {
  userId: number;
  eventId: number;
  uuid: number;
}