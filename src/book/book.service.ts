import { Injectable, HttpException } from '@nestjs/common';
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

  async getAllBooks(): Promise<any> {
    const allBooks: Book[] = await this.bookRepository.find();
    if (allBooks.length == 0) {
      throw new HttpException(
        { success: false, error: true, message: 'No Data Available' },
        400,
      );
    }
    return {success: true, error: false, message: allBooks};
  }

  async getBookById(id: number): Promise<any> {
    const collection: Book = await this.bookRepository.findOne({
      where: { id },
    });
    if (!collection) {
      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Unable to find the book',
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

  async getBookByTitle(title:string): Promise<any> {
    try{
      return await this.bookRepository.find({ where: { title } });
    }
    catch(err){
      return {message: err.detail}
    }
  }

  async updateBook(id: number, book: UpdateBookDto): Promise<any> {
    const bookObj: Book = await this.bookRepository.findOne({
      where: { id },
    });
    if (!bookObj) {
      throw new HttpException(
        { success: false, error: true, message: 'Invalid User ID' },
        400,
      );
    }
    for (const key in bookObj) {
      if (book.hasOwnProperty(key)) {
        bookObj[key] = book[key];
      }
    }
    return {
      success: true,
      error: false,
      message: await this.bookRepository.save(bookObj),
    };
  }

  async deleteBook(id: number): Promise<any> {
    const findBook: Book = await this.bookRepository.findOne({
      where: { id },
    });
    if (!findBook) {
      throw new HttpException(
        { success: false, error: true, message: 'Unable to remove Book' },
        400,
      );
    }
    const book: any = await this.bookRepository.delete(id);
    return {
      success: true,
      error: false,
      message: book,
    };
  }
}
