import { Entity, Column, PrimaryGeneratedColumn, NumericType } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  book_id: number;

  @Column({ default: false })
  is_in_wishlist: boolean;
}
