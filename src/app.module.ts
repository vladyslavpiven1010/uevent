import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { 
  CategoryController,
  CommentController,
  EventController,
  PostController,
  TicketController,
  UserEventController
} from './controllers';

@Module({
  imports: [CoreModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [
    CategoryController, 
    CommentController,
    EventController, 
    PostController, 
    TicketController, 
    UserEventController],
  providers: [],
})
export class AppModule {}
