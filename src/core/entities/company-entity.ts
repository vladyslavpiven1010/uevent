import { Entity } from './shared/interfaces';

/**
 * Entity interface that represents company.
 */
export interface Company extends Entity {
  name: string;
  slogan: string;
  imageUrl: string;
  email: string;
  address: string;
}