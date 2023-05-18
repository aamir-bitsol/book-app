import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';
import { Comment as Comment } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from 'src/event_service/event_service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Book, User])],
  controllers: [CommentsController],
  providers: [CommentsService, EventsService],
})
export class CommentsModule {}
