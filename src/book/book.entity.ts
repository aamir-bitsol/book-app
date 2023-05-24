import { Comment } from 'src/comments/comments.entity';
import { Review } from 'src/reviews/reviews.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  JoinTable,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', nullable: false })
  title: string;

  @ManyToMany(() => User, user=> user.books,{ nullable: false })
  @JoinTable()
  author: User[];

  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[];

  @OneToMany(() => Review, (review) => review.book)
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
