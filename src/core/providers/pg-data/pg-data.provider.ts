import { Pool } from 'pg';
import { IDataProvider } from 'src/core/abstracts';
import { PgRepository } from './pg-repository';
import { Injectable, Logger } from '@nestjs/common';
import { exit } from 'process';
import { ConfigService } from '@nestjs/config';
import { PgDataClient } from './pg-data-client';

@Injectable()
export class PgDataProvider implements IDataProvider {
  private _pool: Pool;
  private _logger = new Logger(PgDataProvider.name);

  constructor(private _configService: ConfigService) {
    this._pool = new Pool({
      user: this._configService.get<string>('DB_USER'),
      host: this._configService.get<string>('DB_HOST'),
      database: this._configService.get<string>('DB_NAME'),
      password: this._configService.get<string>('DB_PASSWORD'),
      port: this._configService.get<number>('DB_PORT'),
    });

    // try to connect to the database
    this._pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        this._logger.error(err);
        exit(1);
      }
      this._logger.log('Successfully connected to the database');
    });
  }

  public async getClientAndBegin(client?: PgDataClient): Promise<PgDataClient> {
    if (!client) {
      const dbClient = await this._pool.connect();
      if (!dbClient) throw Error('Client has not been acquired');
      client = new PgDataClient(dbClient);
    }
    await client.begin();
    return client;
  }
}