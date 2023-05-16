import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userId: number;

  @Column()
  bookId: number;

  @Column({ default: false })
  isFavorite: boolean;
}
