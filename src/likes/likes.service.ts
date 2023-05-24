import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './likes.entity';
import { IncreaseLikeDTO, RemoveLikeDTO } from './likes.dto';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';
import { EventsService } from 'src/event_service/event_service.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly eventsService: EventsService,
  ) {}

  async getAllLikes() {
    return { success: true, error: false, message: await this.likeRepo.find() };
  }

  async getLikesOfABook(id) {
    return {
      success: true,
      error: false,
      message: await this.likeRepo.findOne({ where: { id } }),
    };
  }

  async increaseLike(data: IncreaseLikeDTO) {
    const bookId: number = data.bookId;
    const user_id: number = data.userId;
    const user: User = await this.userRepo.findOne({ where: { id: user_id } });
    const book: Book = await this.bookRepo.findOne({ where: { id: bookId } });

    if (!user || !book) {
      this.eventsService.emit({ message: 'Unable to like this book!' });
      throw new HttpException(
        { success: false, error: true, message: 'Invalid User Id or Book Id' },
        400,
      );
    }

    const likes: Like = await this.likeRepo.findOne({
      where: { bookId },
    });

    if (!likes) {
      this.eventsService.emit({ message: 'You liked a book' });
      const newLike: Like = new Like();
      newLike.bookId = bookId;
      newLike.userId = [user_id];
      newLike.likes_count = 1;
      return await this.likeRepo.save(newLike);
    }

    const userExistsInArray: boolean = likes.userId.includes(user_id);
    if (userExistsInArray) {
      this.eventsService.emit({ message: 'You have already liked this book' });
      throw new HttpException(
        {
          success: true,
          error: false,
          message: 'You have already liked this book',
        },
        200,
      );
    }
    likes.bookId = bookId;
    likes.userId.push(user_id);
    likes.likes_count = likes.userId.length;
    likes.userId = likes.userId.map(Number);

    this.eventsService.emit({ message: 'You liked a book' });
    return {
      success: true,
      error: false,
      message: await this.likeRepo.save(likes),
    };
  }

  async removeLike(data: RemoveLikeDTO) {
    const bookId: number = data.bookId;
    const userId: number = data.userId;
    const user: User = await this.userRepo.findOne({ where: { id: userId } });
    const book: Book = await this.bookRepo.findOne({ where: { id: bookId } });

    if (!user || !book) {
      this.eventsService.emit({ message: 'Unable to unlike this book' });
      throw new HttpException(
        { success: false, error: true, message: 'Invalid User Id or Book Id' },
        400,
      );
    }

    const likes: Like = await this.likeRepo.findOne({
      where: { bookId },
    });

    const userInLiked: boolean = likes.userId.includes(userId);
    if (!userInLiked) {
      this.eventsService.emit({ message: 'Unable to unlike this book' });

      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'You have not liked this book',
        },
        400,
      );
    }

    this.eventsService.emit({ message: 'You unlike a book' });

    const index = likes.userId.indexOf(userId);
    likes.userId.splice(index, 1);
    likes.likes_count = likes.userId.length;
    return await this.likeRepo.save(likes);
  }
}
