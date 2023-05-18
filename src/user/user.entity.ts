import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Book } from 'src/book/book.entity';
import { Comment } from 'src/comments/comments.entity';
import { Review } from 'src/reviews/reviews.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  contact: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ default: '', nullable: true })
  image: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async nullChecks() {
    if (!this.reviews) {
      this.reviews = [];
    }
  }
}
