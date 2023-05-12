import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 0 })
  likes_count: number;

  @Column('simple-array', { nullable: true })
  userId: number[];

  @Column({ nullable: false })
  bookId: number;
}
