import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from 'src/event_service/event_service.service';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comments/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Comment])],
  providers: [BookService, EventsService],
  controllers: [BookController],
})
export class BookModule {}
