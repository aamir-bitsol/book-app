import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  comment: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Book)
  @JoinColumn()
  book: Book;
}
