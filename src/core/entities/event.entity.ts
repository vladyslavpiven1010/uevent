import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents event.
 */
export interface Event extends Entity {
  companyId: number;
  categoryId: number;
  name: string;
  description?: string;
  format?: number;
  imageUrl?: string;
  wrapperUrl?: string;
  ticketCount: number;
  ticketPrice: number;
}