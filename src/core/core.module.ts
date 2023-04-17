import { Module } from '@nestjs/common';
import { IDataProvider } from './abstracts';
import { CategoryService, CommentService, EventService, PostService, TicketService, UserEventService } from './services';
import { PgDataProvider } from './providers';
import { TokenService } from './services/token/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    // Set external providers for core abstract interfaces
    { provide: IDataProvider, useClass: PgDataProvider },

    // Register all business logic services
    CategoryService, CommentService, EventService, PostService, TicketService, UserEventService, TokenService
  ],
  exports: [
    // Export all business logic services
    CategoryService, CommentService, EventService, PostService, TicketService, UserEventService
  ],
  imports: [
    JwtModule.register({
    secret: 'sdfsdf',
    signOptions: { expiresIn: '1m' },
  })
]
})
export class CoreModule {}
