import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { EventsService } from 'src/event_service/event_service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService, EventsService],
})
export class ReviewsModule {}
