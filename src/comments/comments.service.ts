import { Injectable, HttpException, UseGuards } from '@nestjs/common';
import { CreateCommentDTO, UpdateCommentDTO } from './comments.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';
import { Comment as Comment } from './comments.entity';
import { EventsService } from 'src/event_service/event_service.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentsRepo: Repository<Comment>,
    private readonly eventsService: EventsService,
  ) {}

  async getAllComments() {
    const allComments: Comment[] = await this.commentsRepo.find({
      relations: ['book', 'user'],
      select: {
        id: true,
        comment: true,
        user: { username: true, email: true },
      },
    });
    if (allComments.length == 0) {
      throw new HttpException(
        { success: false, error: true, message: 'No Data Available' },
        200,
      );
    }
    return { success: true, error: false, message: allComments };
  }

  async createComment(data: CreateCommentDTO) {
    const book_id: Book = data.book;
    const user_id: User = data.user;

    const is_user: boolean = await this.userRepo.exist({
      where: { id: user_id.id },
    });
    const is_book: boolean = await this.bookRepo.exist({
      where: { id: book_id.id },
    });

    if (!is_book || !is_user) {
      this.eventsService.emit({ message: `You added a comment on Book` });

      throw new HttpException(
        { success: false, error: true, message: 'Invalid User Id or Book Id' },
        400,
      );
    }
    const comment: Comment = await this.commentsRepo.save(data);
    const output = await this.commentsRepo.findOne({
      where: { id: comment.id },
      relations: ['book', 'user'],
      select: {
        user: { id: true, username: true, email: true },
        book: { id: true, title: true },
      },
    });

    return {
      success: true,
      error: false,
      message: output,
    };
  }

  async deleteComment(id: number) {
    const findComment = await this.commentsRepo.findOne({ where: { id } });
    if (!findComment) {
      this.eventsService.emit({ message: 'Unable to delete your comment' });
      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Invalid Comment Id',
        },
        400,
      );
    }
    const deleteComment: DeleteResult = await this.commentsRepo.delete(id);
    this.eventsService.emit({ message: 'You deleted your comment' });
    return {
      success: true,
      error: false,
      message: deleteComment,
    };
  }

  async updateComment(id: number, data: UpdateCommentDTO) {
    const commentObj: Comment = await this.commentsRepo.findOne({
      where: { id },
    });
    if (!commentObj) {
      this.eventsService.emit({ message: 'Unable to update your comment' });

      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Invalid comment Id',
        },
        400,
      );
    }
    console.log(data);
    for (const key in commentObj) {
      if (data.hasOwnProperty(key)) {
        commentObj[key] = data[key];
      }
    }

    this.eventsService.emit({ message: 'You updated your comment' });

    return {
      success: true,
      error: false,
      message: await this.commentsRepo.save(commentObj),
    };
  }
}
