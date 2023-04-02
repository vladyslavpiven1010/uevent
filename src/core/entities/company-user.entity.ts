import { Entity } from './shared/interfaces';
import { Roles } from './shared/enums';

/**
 * Entity interface that represents user of company.
 */
export interface CompanyUser extends Entity {
  companyId: number;
  userId: number;
  role: Roles;
}