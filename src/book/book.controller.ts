import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { BookService } from './book.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Returns an array of books' })
  getBooks(): Promise<any[]> {
    return this.bookService.getAllBooks();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'This API will create a new book' })
  createBook(@Body() book: CreateBookDto): Promise<any> {
    return this.bookService.createBook(book);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific book' })
  @ApiResponse({ status: 200, description: 'Returns a specific book' })
  @ApiBadRequestResponse({ status: 400, description: 'Given id is invalid' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Integer value to get the specific book',
  })
  getSpecificBookId(@Param('id') id: number): Promise<any> {
    return this.bookService.getBookById(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Get a book by Title' })
  @ApiResponse({
    status: 200,
    description: 'Returns book based on matched title',
  })
  @ApiQuery({
    name: 'title',
    required: true,
    description: 'String value to search the book',
  })
  getBookByTitle(@Query('title') title: string): Promise<any> {
    console.log('here');
    return this.bookService.getBookByTitle(title);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the specific book details' })
  @ApiResponse({
    status: 200,
    description: 'This API will update the details of specific book',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Given id is invalid' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Integer value to update the specific book',
  })
  updateBook(@Param() param: any, @Body() book: UpdateBookDto): Promise<any> {
    return this.bookService.updateBook(param.id, book);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({ status: 200, description: 'This API will remove a book' })
  @ApiBadRequestResponse({ status: 400, description: 'Given id is invalid' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Integer value to delete the specific book',
  })
  deleteBook(@Param('id') id: number): Promise<any> {
    return this.bookService.deleteBook(id);
  }

  @Get('reviews/:id')
  async getReviews(@Param('id') id: number) {
    return this.bookService.getBooksReviews(id);
  }
}
