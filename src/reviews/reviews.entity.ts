import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  review: string;

  @ManyToOne(() => User, (user) => user.reviews, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne(() => Book, (book) => book.reviews, {onDelete:  'CASCADE'})
  @Unique(['user', 'User']) // For every review, User must be unique against a book. For new book, all users can add review
  book: Book;
}
