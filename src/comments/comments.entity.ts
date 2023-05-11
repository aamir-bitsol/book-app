import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  comment: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  bookId: number;
}
