import { Comment } from 'src/comments/comments.entity';
import { Review } from 'src/reviews/reviews.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', nullable: false })
  title: string;

  @ManyToOne(() => User, { nullable: false })
  author: User;

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
