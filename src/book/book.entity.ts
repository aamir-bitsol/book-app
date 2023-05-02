import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:"", nullable:true})
  title: string;

  @Column({default:"", nullable:true})
  author: string;
}
