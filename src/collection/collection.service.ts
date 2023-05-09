import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { CreateCollectionDTO } from './collection.dto';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getAllCollections() {
    return await this.collectionRepo.find();
  }

  async createCollection(collectionData: CreateCollectionDTO) {
    const user_id: number = collectionData.user_id;
    const book_id: number = collectionData.book_id;
    const user: User = await this.userRepo.findOne({ where: { id: user_id } });
    const book: Book = await this.bookRepo.findOne({ where: { id: book_id } });

    if (!user || !book) {
      return { message: 'Invalid book or user Id' };
    }

    const data_exists = await this.collectionRepo.findOne({
      where: { user_id, book_id },
    });

    if (data_exists) {
      return { 
        success: true,
        error: false,
        message: 'Data already exists' };
    }

    const collection: Collection = await this.collectionRepo.save(
      collectionData,
    );
    return { message: collection };
  }

  async getSpecificCollection(id: number) {
    return await this.collectionRepo.find({ where: { id } });
  }

  async deleteCollection(id: number) {
    return await this.collectionRepo.delete(id);
  }
}
