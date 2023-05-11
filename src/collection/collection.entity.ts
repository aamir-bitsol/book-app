import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userId: number;

  @Column()
  bookId: number;

  @Column({ default: false })
  is_in_wishlist: boolean;
}
