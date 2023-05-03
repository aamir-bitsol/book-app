import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async createBook(book: CreateBookDto): Promise<any> {
    const bookObj: Book = new Book();
    bookObj.author = book.author;
    bookObj.title = book.title;
    return await this.bookRepository.save(bookObj);
  }

  getAllBooks(): Promise<any[]> {
    return this.bookRepository.find();
  }

  getSpecificBook(id: number): Promise<any> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async updateBook(id: number, book: UpdateBookDto): Promise<any> {
    const bookObj: any = await this.bookRepository.findOne({ where: { id } });
    bookObj.title = book.title;
    bookObj.author = book.author;
    return this.bookRepository.save(bookObj);
  }

  async deleteBook(id: number) {
    return await this.bookRepository.delete({ id });
  }
}
