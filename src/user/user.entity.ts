import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Book } from 'src/book/book.entity';
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

  @Column({ nullable: false , unique: true})
  @IsEmail()
  email: string;

  @Column({ default: '', nullable: true })
  image: string;

  @OneToMany(()=> Book, (book)=> book.author)
  books: Book[]

  // @OneToOne(()=> Collection, collection => collection.user)
  // collection: Collection;
}
