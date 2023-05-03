import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(): Promise<any[]> {
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() book: CreateBookDto): Promise<any> {
    return this.bookService.createBook(book);
  }

  @Get(':id')
  getSpecificBook(@Param('id') id: number): Promise<any> {
    return this.bookService.getSpecificBook(id);
  }

  @Put(':id')
  updateBook(@Param() param: any, @Body() book: UpdateBookDto): Promise<any> {
    return this.bookService.updateBook(param.id, book);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number): Promise<any> {
    return this.bookService.deleteBook(id);
  }
}
