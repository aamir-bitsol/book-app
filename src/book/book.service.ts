import { Injectable, HttpException } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { EventsService } from 'src/event_service/event_service.service';
import { User } from 'src/user/user.entity';
import { Comment as Comment } from 'src/comments/comments.entity';
import { Review } from 'src/reviews/reviews.entity';
import { MyLoggerService } from 'src/mylogger/mylogger.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly eventsService: EventsService,
  ) {}
    private logger = new MyLoggerService(BookService.name);
  async createBook(book: CreateBookDto): Promise<any> {
    const authors: Array<number> = book.author;
    const userObj: User[] = await this.userRepository.find({
      where: { id: In(authors) },
    });
    if (userObj.length != book.author.length) {
      throw new HttpException(
        { success: false, error: true, data: 'Invalid Author Id' },
        400,
      );
    }
    const newBook: Book = await this.bookRepository.create({
      title: book.title,
      author: userObj,
    });
    this.eventsService.emit({ data: 'Book created successfully' });

    return {
      success: true,
      error: false,
      data: await this.bookRepository.save(newBook),
    };
  }

  async getAllBooks(): Promise<any> {
    this.logger.error('Get All Books API Called')
    const allBooks: Book[] = await this.bookRepository.find({
      relations: ['author', 'comments', 'reviews'],
    });

    if (allBooks.length == 0) {
      throw new HttpException(
        { success: false, error: true, data: 'No Data Available' },
        400,
      );
    }

    return { success: true, error: false, data: allBooks };
  }

  async getBookById(id: number): Promise<any> {
    const collection: Book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'reviews'],
    });

    if (!collection) {
      throw new HttpException(
        {
          success: false,
          error: true,
          data: 'Unable to find the book',
        },
        400,
      );
    }

    return {
      success: true,
      error: false,
      data: collection,
    };
  }

  async getBookByTitle(title: string): Promise<any> {
    try {
      return await this.bookRepository.find({ where: { title } });
    } catch (err) {
      return { data: err.detail };
    }
  }

  async updateBook(id: number, book: UpdateBookDto): Promise<any> {
    const bookObj: Book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'reviews', 'comments'],
    });

    if (!bookObj) {
      this.eventsService.emit({ data: 'Unable to Update Book' });
      throw new HttpException(
        { success: false, error: true, data: 'Invalid User ID' },
        400,
      );
    }

    for (const key in bookObj) {
      if (book.hasOwnProperty(key)) {
        bookObj[key] = book[key];
      }
    }
    this.eventsService.emit({ data: 'Book updated successfully' });

    return {
      success: true,
      error: false,
      data: await this.bookRepository.save(bookObj),
    };
  }

  async deleteBook(id: number): Promise<any> {
    const findBook: Book = await this.bookRepository.findOne({
      where: { id },
    });
    
    if (!findBook) {
      this.eventsService.emit({ data: 'Unable to Delete Book' });

      throw new HttpException(
        { success: false, error: true, data: 'Unable to remove Book' },
        400,
      );
    }
    this.eventsService.emit({ data: 'Book Deleted successfully' });

    const book: DeleteResult = await this.bookRepository.delete(id);
    return {
      success: true,
      error: false,
      data: book,
    };
  }

  async getBooksReviews(id: number) {
    const query: Book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'reviews'],
      select: {
        author: { id: true, username: true, name: true, email: true },
      },
    });
    if (!query) {
      throw new HttpException(
        {
          success: false,
          error: true,
          data: 'Invalid Book Id',
        },
        400,
      );
    }
    return {
      success: true,
      error: false,
      data: query,
    };
  }
}
