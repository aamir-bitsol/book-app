import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collection } from './collection.entity';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, Book, User])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
