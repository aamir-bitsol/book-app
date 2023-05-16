import { Injectable, HttpException } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { EventsService } from 'src/event_service/event_service.service';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comments/comments.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly eventsService: EventsService,
  ) {}

  async createBook(book: CreateBookDto): Promise<any> {
    const user: User = book.author;
    const userObj: User = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!userObj) {
      throw new HttpException(
        { success: false, error: true, message: 'Invalid Author Id' },
        400,
      );
    }

    const bookObj: Book = new Book();
    bookObj.author = book.author;
    bookObj.title = book.title;
    this.eventsService.emit({ message: 'Book created successfully' });
    await this.bookRepository.save(bookObj);
    return await this.bookRepository.findOne({where:{id: bookObj.id}, relations: ['author', 'reviews']}) 
  }

  async getAllBooks(): Promise<any> {
    const allBooks: Book[] = await this.bookRepository.find({
      relations: ['author', 'reviews'],
    });
    if (allBooks.length == 0) {
      throw new HttpException(
        { success: false, error: true, message: 'No Data Available' },
        400,
      );
    }
    return { success: true, error: false, message: allBooks };
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

  async getBookByTitle(title: string): Promise<any> {
    try {
      return await this.bookRepository.find({ where: { title } });
    } catch (err) {
      return { message: err.detail };
    }
  }

  async updateBook(id: number, book: UpdateBookDto): Promise<any> {
    const bookObj: Book = await this.bookRepository.findOne({
      where: { id },
    });
    if (!bookObj) {
      this.eventsService.emit({ message: 'Unable to Update Book' });
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
    this.eventsService.emit({ message: 'Book updated successfully' });

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
      this.eventsService.emit({ message: 'Unable to Delete Book' });

      throw new HttpException(
        { success: false, error: true, message: 'Unable to remove Book' },
        400,
      );
    }
    this.eventsService.emit({ message: 'Book Deleted successfully' });

    const book: any = await this.bookRepository.delete(id);
    return {
      success: true,
      error: false,
      message: book,
    };
  }
}
