import { Collection } from 'src/collection/collection.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

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

  @Column({ default: '', nullable: true })
  image: string;

  // @OneToOne(()=> Collection, collection => collection.user)
  // collection: Collection;
}
