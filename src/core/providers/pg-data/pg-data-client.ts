import { PoolClient } from 'pg';
import { IDataClient, IRepository } from 'src/core/abstracts';
import { Category, Comment, Company, CompanyUser, Event, Post, Ticket, UserEvent } from 'src/core/entities';
import { PgRepository } from './pg-repository';

export class PgDataClient implements IDataClient {
  public category: IRepository<Category>;
  public comment: IRepository<Comment>;
  public company: IRepository<Company>;
  public companyUser: IRepository<CompanyUser>;
  public event: IRepository<Event>;
  public post: IRepository<Post>;
  public ticket: IRepository<Ticket>;
  public userEvent: IRepository<UserEvent>;

  private _isTransactionStarted = false;
  private _savepoints: string[] = [];

  constructor(private _client: PoolClient) {
    this.category = new PgRepository<Category>(this._client, { table: 'category', verbose: 'Category' });
    this.comment = new PgRepository<Comment>(this._client, { table: 'comment', verbose: 'Comment' });
    this.company = new PgRepository<Company>(this._client, { table: 'company', verbose: 'Company' });
    this.companyUser = new PgRepository<CompanyUser>(this._client, { table: 'company_user', verbose: 'Company User' });
    this.event = new PgRepository<Event>(this._client, { table: 'event', verbose: 'Event' });
    this.post = new PgRepository<Post>(this._client, { table: 'post', verbose: 'Post' });
    this.ticket = new PgRepository<Ticket>(this._client, { table: 'ticket', verbose: 'Ticket' });
    this.userEvent = new PgRepository<UserEvent>(this._client, { table: 'user_event', verbose: 'User Event' });
  }

  public async begin(): Promise<void> {
    if (!this._isTransactionStarted) {
      await this._client.query('BEGIN TRANSACTION', []);
      console.log('BEGIN TRANSACTION');
      this._isTransactionStarted = true;
    } else {
      const savepoint = `savepoint_${this._savepoints.length}`;
      await this._client.query(`SAVEPOINT ${savepoint}`, []);
      console.log(`SAVEPOINT ${savepoint}`);
      this._savepoints.push(savepoint);
    }
  }

  public async commit(): Promise<void> {
    if (this._isTransactionStarted && !this._savepoints.length) {
      await this._client.query('COMMIT TRANSACTION', []);
      console.log('COMMIT TRANSACTION');
    }
  }

  public async rollback(): Promise<void> {
    if (!this._isTransactionStarted) return;
    if (this._savepoints.length) {
      const toSavepoint = this._savepoints[this._savepoints.length - 1];
      await this._client.query(`ROLLBACK TO ${toSavepoint}`, []);
      console.log(`ROLLBACK TO ${toSavepoint}`);
    } else {
      await this._client.query(`ROLLBACK`, []);
      console.log('ROLLBACK');
    }
  }

  public release(error?: boolean): void {
    if (this._savepoints.length) {
      this._savepoints.pop();
    } else {
      this._client.release(error);
      console.log('RELEASE');
    }
  }
}