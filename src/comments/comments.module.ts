import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';
import { Comment } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([User])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
