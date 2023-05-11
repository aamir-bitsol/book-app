import { Injectable, HttpException, UseGuards } from '@nestjs/common';
import { CreateCommentDTO, UpdateCommentDTO } from './comments.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentsRepo: Repository<Comment>,
  ) {}
  async getAllComments() {
    const allComments: Comment[] = await this.commentsRepo.find();
    if (allComments.length == 0) {
      throw new HttpException(
        { success: false, error: true, message: 'No Data Available' },
        200,
      );
    }
    return { success: true, error: false, message: allComments };
  }

  async createComment(data: CreateCommentDTO) {
    const book_id: number = data.bookId;
    const user_id: number = data.userId;

    const is_user: boolean = await this.userRepo.exist({
      where: { id: user_id },
    });
    const is_book: boolean = await this.bookRepo.exist({
      where: { id: book_id },
    });

    if (!is_book || !is_user) {
      throw new HttpException(
        { success: false, error: true, message: 'Invalid User Id or Book Id' },
        400,
      );
    }
    const comment: Comment = await this.commentsRepo.save(data);
    return {
      success: true,
      error: false,
      message: comment,
    };
  }

  async deleteComment(id: number) {
    const findComment = await this.commentsRepo.findOne({ where: { id } });
    if (!findComment) {
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
    return {
      success: true,
      error: false,
      message: deleteComment,
    };
  }

  async updateComment(id: number, data: UpdateCommentDTO) {
    const commentObj: Comment = await this.commentsRepo.findOne({where:{id}})
    if(!commentObj){
      throw new HttpException({
        success: false,
        error: true,
        message: "Invalid comment Id"
      }, 400);
    }
    console.log(data);
    for (const key in commentObj) {
      if (data.hasOwnProperty(key)) {
        commentObj[key] = data[key];
      }
    }
    return {
      success: true,
      error: false,
      message: await this.commentsRepo.save(commentObj),
    }; 
  }
}
