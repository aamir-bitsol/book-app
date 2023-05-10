import { Injectable, HttpException } from '@nestjs/common';
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

  async getAllCollections(): Promise<any> {
    const allCollections: Collection[] = await this.collectionRepo.find();
    if (allCollections.length == 0) {
      throw new HttpException(
        { success: false, error: true, message: 'No Data Available' },
        200,
      );
    }
    return {success: true, error: false, message: allCollections};
  }

  async createCollection(collectionData: CreateCollectionDTO): Promise<any> {
    const user_id: number = collectionData.user_id;
    const book_id: number = collectionData.book_id;
    const user: User = await this.userRepo.findOne({ where: { id: user_id } });
    const book: Book = await this.bookRepo.findOne({ where: { id: book_id } });

    if (!user || !book) {
      return new HttpException(
        { success: false, error: true, message: 'Invalid book or user Id' },
        400,
      );
    }

    const data_exists = await this.collectionRepo.findOne({
      where: { user_id, book_id },
    });

    if (data_exists) {
      throw new HttpException(
        { success: false, error: true, message: 'Data already exists' },
        400,
      );
    }

    const collection: Collection = await this.collectionRepo.save(
      collectionData,
    );
    return {
      success: true,
      error: false,
      message: collection,
    };
  }

  async getSpecificCollection(id: number): Promise<any> {
    const collection: Collection = await this.collectionRepo.findOne({
      where: { id },
    });
    if (!collection) {
      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Unable to find the collection',
        },
        400,
      );
    }
    return {
      success: true,
      error: false,
      message: collection,
    };
  }

  async updateCollection(id, data){
    const collectionObj: Collection = await this.collectionRepo.findOne({
      where: { id },
    });
    if (!collectionObj) {
      throw new HttpException(
        { success: false, error: true, message: 'Invalid Collection ID' },
        400,
      );
    }
    for (const key in collectionObj) {
      if (data.hasOwnProperty(key)) {
        collectionObj[key] = data[key];
      }
    }
    return {
      success: true,
      error: false,
      message: await this.collectionRepo.save(collectionObj),
    };
  }

  async deleteCollection(id: number): Promise<any> {
    const findCollection: Collection = await this.collectionRepo.findOne({
      where: { id },
    });
    if (!findCollection) {
      throw new HttpException(
        { success: false, error: true, message: 'Unable to remove Collection' },
        400,
      );
    }
    const collection: any = await this.collectionRepo.delete(id);
    return {
      success: true,
      error: false,
      message: collection,
    };
  }
}
