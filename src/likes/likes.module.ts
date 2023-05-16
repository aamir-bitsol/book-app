import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './likes.entity';
import { EventsService } from 'src/event_service/event_service.service';
import { EventServiceController } from 'src/event_service/event_service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Book, User]),],
  controllers: [LikesController, EventServiceController],
  providers: [LikesService, EventsService]
})
export class LikesModule {}
