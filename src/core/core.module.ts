import { Module } from '@nestjs/common';
import { IDataProvider } from './abstracts';
import { ConfigModule } from '@nestjs/config';
//import { PgDataProvider } from 'src/providers';

@Module({
  providers: [
    // Set external providers for core abstract interfaces
    //{ provide: IDataProvider, useClass: PgDataProvider },
  ],
  exports: [
    // Export all business logic services
    IDataProvider,
  ],
  imports: [
    ConfigModule
  ],
})
export class CoreModule {}
