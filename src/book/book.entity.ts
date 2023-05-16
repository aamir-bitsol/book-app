import { Collection } from 'src/collection/collection.entity';
import { Comment } from 'src/comments/comments.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', nullable: false })
  title: string;

  @OneToOne(()=> User, {nullable: false})
  @JoinColumn()
  author: User;

  @OneToMany(()=> Comment, (comment) => comment.book)
  reviews: Comment[];
  
  // @OneToOne(() => Collection, (collection) => collection.book)
  // collection: Collection;
}
