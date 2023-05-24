import { Injectable, HttpException } from '@nestjs/common';
import { CreateReviewDTO } from './reviews.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { Repository, DeleteResult } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Review } from './reviews.entity';
import { EventsService } from 'src/event_service/event_service.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly eventsService: EventsService,
  ) {}

  async getAllReviews() {
    const allReviews: Review[] = await this.reviewRepository.find({
      relations: ['book', 'user'],
      select: {
        user: { id: true, username: true, email: true },
      },
    });
    if (allReviews.length == 0) {
      throw new HttpException(
        { success: false, error: true, message: 'No Data Available' },
        200,
      );
    }
    return { success: true, error: false, message: allReviews };
  }

  async createReview(data: CreateReviewDTO) {
    const book_id: number = data.book;
    const user_id: number = data.user;

    const user: User = await this.userRepository.findOne({
      where: { id: user_id },
    });
    const book: Book = await this.bookRepository.findOne({
      where: { id: book_id },
    });
    if (!book || !user) {
      this.eventsService.emit({ message: `You added a review on Book` });

      throw new HttpException(
        { success: false, error: true, message: 'Invalid User Id or Book Id' },
        400,
      );
    }
    const review: Review = await this.reviewRepository.create({
      review: data.review,
      user,
      book,
    });

    user.reviews.push(review);
    book.reviews.push(review);

    await this.reviewRepository.save(review);

    const output = await this.reviewRepository.findOne({
      where: { id: review.id },
      relations: ['book', 'user'],
      select: {
        book: { id: true, title: true },
        user: { id: true, username: true, email: true },
      },
    });

    return {
      success: true,
      error: false,
      message: output,
    };
  }

  async updateReview(id: number, data: CreateReviewDTO) {
    const reviewObj: Review = await this.reviewRepository.findOne({
      where: { id },
    });
    if (!reviewObj) {
      this.eventsService.emit({ message: 'Unable to update your Review' });

      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Invalid review Id',
        },
        400,
      );
    }
    for (const key in reviewObj) {
      if (data.hasOwnProperty(key)) {
        reviewObj[key] = data[key];
      }
    }

    this.eventsService.emit({ message: 'Review Updated successfully' });

    return {
      success: true,
      error: false,
      message: await this.reviewRepository.save(reviewObj),
    };
  }

  async deleteReview(id: number) {
    const findReview = await this.reviewRepository.findOne({ where: { id } });

    if (!findReview) {
      this.eventsService.emit({ message: 'Unable to delete your review' });
      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Invalid Review Id',
        },
        400,
      );
    }

    const deleteReview: DeleteResult = await this.reviewRepository.delete(id);
    this.eventsService.emit({ message: 'Review Deleted successfully' });
    return {
      success: true,
      error: false,
      message: deleteReview,
    };
  }
}
