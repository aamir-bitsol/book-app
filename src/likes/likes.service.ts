import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './likes.entity';
import { IncreaseLikeDTO } from './likes.dto';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getAllLikes() {
    return { success: true, error: false, message: await this.likeRepo.find() };
  }
  async getLikesOfABook(id) {
    return await this.likeRepo.findOne({ where: { id } });
  }
  async increaseLike(data: IncreaseLikeDTO) {
    const bookId: number = data.bookId;
    const userId: number = data.userId;
    const user: User = await this.userRepo.findOne({ where: { id: userId } });
    const book: Book = await this.bookRepo.findOne({ where: { id: bookId } });

    if (!user || !book) {
      throw new HttpException(
        { success: false, error: true, message: 'Invalid User Id or Book Id' },
        400,
      );
    }

    const likes: Like = await this.likeRepo.findOne({
      where: { bookId, userId },
    });

    if (likes) {
      throw new HttpException(
        {
          success: true,
          error: false,
          message: 'You have already liked this book',
        },
        200,
      );
    }
    const bookExists: Like = await this.likeRepo.findOne({ where: { bookId } });
    if (!bookExists) {
      const newLike: Like = new Like();
      newLike.likes_count = 1;
      newLike.bookId = bookId;
      newLike.userId = [userId];
      console.log(newLike);
      return await this.likeRepo.save(newLike);
    } else {
      bookExists.bookId = bookId;
      ++bookExists.likes_count;
      bookExists.userId.push(userId);
    }
    return {
      success: true,
      error: false,
      message: await this.likeRepo.save(bookExists),
    };
  }
  async removeLike(id, data) {}
}
