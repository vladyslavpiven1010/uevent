import { Entity } from "src/core/entities";

/**
 * This interface provides a standard way of defining and representing data models in an application.
 */
export interface Model {
  table: string;
  verbose: string;
}

/**
 * This interface defines conditions for filtering the results of a query.
 */
export interface WhereOptions {
  [keys: string]: any;
}

/**
 * This interface defines the ordering of the results of a query.
 */
export interface OrderByOptions {
  [keys: string]: 'ASC' | 'DESC';
}

/**
 * This interface defines options for building a SQL query. This interface provides a convenient way to pass query options between different parts of an application that need to build and execute SQL queries.
 *
 * The interface has several optional properties:
 * ```
 * const options: QueryOptions = {
 *   // An object that defines conditions for filtering the results of a query.
 *   where: { name: 'Jane', age: 30 },
 *   // An object that defines the ordering of the results of a query.
 *   orderBy: { name: 'ASC', age: 'DESC' },
 *   // A number that specifies the offset of the first row to be returned by a query
 *   offset: 0,
 *   // A number that specifies the maximum number of rows to be returned by a query
 *   limit: 10
 * }
 * ```
 */
export interface QueryOptions {
  where?: WhereOptions;
  orderBy?: OrderByOptions;
  offset?: number;
  limit?: number;
}

/**
 * This abstract class provides a standard set of methods for performing CRUD operations on entities in a data store, making it easy to implement concrete repository classes for different types of data stores.
 */
export abstract class IRepository<T extends Entity> {
  /**
   * Find all entities that match the given query options and return them as an array.
   * @param options options for building a SQL query
   */
  abstract findAll(options: QueryOptions): Promise<T[]>;

  /**
   * Find a single entity that matches the given query options and return it.
   * @param options options for building a SQL query
   */
  abstract findOne(options: QueryOptions): Promise<T>;

  /**
   * Find an entity by its ID and return it.
   * @param id entity ID
   */
  abstract findById(id: number): Promise<T>;

  /**
   * Create a new entity with the given data and return it.
   * @param item entity object
   */
  abstract create(item: T): Promise<T>;

  /**
   * Update all entities that match the given query options with the given data and return updated entities as an array.
   * @param options options for building a SQL query
   * @param item update object
   */
  abstract updateAll(options: QueryOptions, item: any): Promise<T[]>;

  /**
   * Update a single entity that matches the given query options with the given data and return the updated entity.
   * @param options options for building a SQL query
   * @param item update object
   * @deprecated
   */
  abstract updateOne(options: QueryOptions, item: any): Promise<T>;

  /**
   * Update an entity with the given ID with the given data and return the updated entity.
   * @param id entity ID
   * @param item update object
   */
  abstract updateById(id: number, item: any): Promise<T>;
}