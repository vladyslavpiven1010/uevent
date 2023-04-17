import { Category, Comment, Event, Post, Ticket, UserEvent } from '../../entities';
import { IRepository } from './repository.abstract';
//import { IUserRepository } from './user-repository.abstract';

/**
 * This abstract class defines abstract properties for different repository interfaces, specifically `users`, `sessions`, `refreshTokens`, and `verificationCodes`.
 * It represents data client that provide a common interface for accessing data in a database.
 */
export abstract class IDataClient {
    abstract category: IRepository<Category>;
    abstract comment: IRepository<Comment>;
    abstract event: IRepository<Event>;
    abstract post: IRepository<Post>;
    abstract ticket: IRepository<Ticket>;
    abstract userEvent: IRepository<UserEvent>;
  
    //abstract dropSlots(): Promise<void>;

  /**
   * Begin transaction for an acquired client or create savepoint if transaction already started.
   */
  abstract begin(): Promise<void>;

  /**
   * Commit transaction for an acquired client if it is no one savepoints left.
   */
  abstract commit(): Promise<void>;

  /**
   * Rollback transaction or rollback to the lattest savepoint for an acquired client.
   */
  abstract rollback(): Promise<void>;

  /**
   * Return an acquired client back to the pool or delete the lattest savepoint.
   */
  abstract release(error?: boolean): void;
}