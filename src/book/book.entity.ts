import { Collection } from 'src/collection/collection.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', nullable: false })
  title: string;

  @Column({ default: '', nullable: false })
  author: string;

  // @OneToOne(() => Collection, (collection) => collection.book)
  // collection: Collection;
}
