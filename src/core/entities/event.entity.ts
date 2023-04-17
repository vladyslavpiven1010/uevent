import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents event.
 */
export interface Event extends Entity {
  company_id: number;
  category_id: number;
  name: string;
  description?: string;
  format?: number;
  image_url?: string;
  wrapper_url?: string;
  ticket_count: number;
  ticket_price: number;
  created_at: Date;
  deleted_at?: Date;
  date: Date
}