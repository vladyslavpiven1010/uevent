import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { 
  commentController,
  CommentController,
  CompanyController,
  CompanyUserController,
  EventController,
  PostController,
  TicketController,
  UserEventController
} from './controllers';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule],
  controllers: [
    commentController, 
    CommentController, 
    CompanyController, 
    CompanyUserController, 
    EventController, 
    PostController, 
    TicketController, 
    UserEventController],
  providers: [],
})
export class AppModule {}
