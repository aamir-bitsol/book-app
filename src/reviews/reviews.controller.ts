import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}
  @Get()
  getAllReviews() {
    return this.reviewService.getAllReviews();
  }
  @Post()
  createReview(@Body() data: CreateReviewDTO) {
    return this.reviewService.createReview(data);
  }
  @Put(':id')
  updateReview(@Param('id') id: number, @Body() data: CreateReviewDTO) {
    return this.reviewService.updateReview(id, data);
  }
  @Delete(':id')
  deleteReview(@Param('id') id: number) {
    return this.reviewService.deleteReview(id);
  }
}
