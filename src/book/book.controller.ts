import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { CreateBookDto } from './book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}
    
    @Get()
    getBooks(): any{
        return this.bookService.getAllBooks()
    }
    
    @Post()
    createBook(@Body() book: CreateBookDto): string{
        return this.bookService.createBook(book)
    }
    
    @Get(':id')
    getSpecificBook(@Param('id') id:number): Promise<any>{
        return this.bookService.getSpecificBook(id);
    }

    @Put(':id')
    updateBook(@Param() param:any){
        
    }
}
