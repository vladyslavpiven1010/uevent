import { IRepository, Model, OrderByOptions, QueryOptions, WhereOptions } from 'src/core/abstracts';
import { Entity } from 'src/core/entities';
import { PoolClient } from 'pg';

export class PgRepository<T extends Entity> implements IRepository<T> {
  protected _table: string;
  protected _verbose: string;

  constructor(protected pool: PoolClient, protected model: Model) {
    this._table = model.table;
    this._verbose = model.verbose;
  }

  public async findAll(options: QueryOptions): Promise<T[]> {
    const optionsQuery = this._optionsToQuery(options);
    const query = `SELECT * FROM "${this._table}" ${optionsQuery}`;
    console.log(query)
    const res = await this.pool.query(query, []);
    return res.rows;
  }

  public async findOne(options: QueryOptions): Promise<T> {
    const optionsQuery = this._optionsToQuery(options);
    const query = `SELECT * FROM "${this._table}" ${optionsQuery} LIMIT 1`;
    const res = await this.pool.query(query, []);
    return res.rows[0];
  }

  public async findById(id: number): Promise<T> {
    const query = `SELECT * FROM "${this._table}" WHERE "id"='${id}' LIMIT 1`;
    const res = await this.pool.query(query, []);
    return res.rows[0];
  }

  public async create(item: T): Promise<T> {
    const keys = Object.keys(item)
      .map(key => `"${key}"`)
      .join(', ');
    const values = Object.values(item);
    const valuesTemplate = Object.values(item)
      .map((value, index) => `$${index + 1}`)
      .join(', ');
    const query = `INSERT INTO "${this._table}" (${keys}) VALUES (${valuesTemplate}) RETURNING *`;
    console.log(query)
    console.log(values)
    const res = await this.pool.query(query, values);
    return res.rows[0];
  }

  public async updateAll(options: QueryOptions, item: any): Promise<T[]> {
    const optionsQuery = this._optionsToQuery(options, false);
    const keysTemplate = Object.keys(item)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');
    const values = Object.values(item);
    const query = `UPDATE "${this._table}" SET ${keysTemplate} ${optionsQuery} RETURNING *`;
    const res = await this.pool.query(query, values);
    return res.rows;
  }

  public async updateOne(options: QueryOptions, item: any): Promise<T> {
    const optionsQuery = this._optionsToQuery(options, false);
    const keysTemplate = Object.keys(item)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');
    const values = Object.values(item);
    const query = `UPDATE "${this._table}" SET ${keysTemplate} ${optionsQuery} RETURNING *`;
    const res = await this.pool.query(query, values);
    return res.rows[0];
  }

  public async updateById(id: number, item: T): Promise<T> {
    const keysTemplate = Object.keys(item)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');
    const values = Object.values(item);
    const query = `UPDATE "${this._table}" SET ${keysTemplate} WHERE "id"='${id}' RETURNING *`;
    console.log(id)
    //console.log(values)
    const res = await this.pool.query(query, values);
    return res.rows[0];
  }

  public async countTicket(eventId: number): Promise<number> {
    const query = `SELECT count(*) FROM "ticket" WHERE "event_id"='${eventId}'`;
    const res = await this.pool.query(query, []);
    return res.rows[0];
  }

  private _whereOptionsToQuery(whereOptions?: WhereOptions): string {
    if (!whereOptions) return '';
    const query = Object.entries(whereOptions).reduce(
      (acc, e, i) => `${acc}${i > 0 ? ' AND ' : ''}"${e[0]}"='${e[1]}'`,
      '',
    );
    return `WHERE ${query}`;
  }

  private _orderByOptionsToQuery(orderByOptions?: OrderByOptions): string {
    if (!orderByOptions) return 'ORDER BY "id" ASC';
    const query = Object.entries(orderByOptions)
      .map(entry => `"${entry[0]}" ${entry[1]}`)
      .join(', ');
    return `ORDER BY ${query}`;
  }

  private _optionsToQuery(options: QueryOptions, withOrder: boolean = true): string {
    const optionsObj = {
      where: this._whereOptionsToQuery(options.where),
      orderBy: withOrder ? this._orderByOptionsToQuery(options.orderBy) : '',
      offset: options.offset ? `OFFSET ${options.offset}` : '',
      limit: options.limit ? `LIMIT ${options.limit}` : '',
    };
    return Object.values(optionsObj).join(' ');
  }
}