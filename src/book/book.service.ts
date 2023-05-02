import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './book.dto';

@Injectable()
export class BookService {
    
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ){}
    
    createBook(book: CreateBookDto): any{
        const bookObj:Book = new Book();
        bookObj.author = book.author;
        bookObj.title = book.title;
        this.bookRepository.save(bookObj);
        return "data created"
    }
    
    getAllBooks(): Promise<any[]> {
        const book: Book = new Book();
        return this.bookRepository.find();
    }

    getSpecificBook(id: number): Promise<any> {
        return this.bookRepository.findOne({where:{id}})
    }
}