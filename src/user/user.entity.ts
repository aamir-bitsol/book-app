import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', nullable: true })
  name: string;

  @Column({ default: '', nullable: true })
  contact: string;

  @Column({ default: '', nullable: true })
  address: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: '', nullable: true })
  image: string;
}
