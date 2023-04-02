import { IDataClient } from './data-client.abstract';
/**
 * Abstract class that represents data provider. It provides access to all data repositories.
 */
export abstract class IDataProvider {
  abstract getClientAndBegin(client?: IDataClient): Promise<IDataClient>;
}