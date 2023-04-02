import { IDataClient, IDataProvider } from 'src/core/abstracts';

const dataClientKey = Symbol('dataClient');

/**
 * Interface that allows to use a `@Transaction()` decorator. An instance of `IDataProvider` interface must be injected in that service.
 * ```
 * export class AwesomeService implements ITransactable {
 *   constructor(public _dataProvider: IDataProvider) {}
 *   ...
 * ```
 */
export interface ITransactable {
  _dataProvider: IDataProvider;
}

/**
 * The `@Transaction()` decorator requires the `DataClient` class as a method parameter, so `@DataClient()` decorator marks this parameter for the `@Transaction()` decorator.
 */
export function DataClient() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata(dataClientKey, parameterIndex, target, propertyKey);
  };
}

/**
 * The `@Transaction()` decorator is a wrapper for service methods. It wraps the entire method in a "try catch finally" block. It calls the data client's `begin()` method at the beginning, `rollback()` if there are any errors occurring in the wrapped method, and `release()` at the end. Also, it acquires and injects a new instance of the `DataClient` class to a {@link DataClient marked} parameter if `undefined` was provided.
 *
 * It is important to have an injected instance of the `IDataProvider` interface with the field name `_dataProvider`.
 */
export function Transaction() {
  return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<Function>) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const dataClientId: number = Reflect.getOwnMetadata(dataClientKey, target, propertyKey);
      if (!dataClientId)
        throw Error('Transaction decorator require DataClient decorator on data client argument of method');

      if (!this._dataProvider)
        throw Error('Service class using @Transaction() decorator must implements an ITransactable interface');

      const dataClient: IDataClient = await this._dataProvider.getClientAndBegin(arguments[dataClientId]);
      arguments[dataClientId] = dataClient;
      arguments.length = arguments.length > dataClientId ? arguments.length : dataClientId + 1;

      try {
        const out = await method.apply(this, arguments);
        await dataClient.commit();
        return out;
      } catch (error) {
        await dataClient.rollback();
        throw error;
      } finally {
        dataClient.release();
      }
    };
  };
}