import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';

export class CreateCommentDTO {
  @ApiProperty({ description: 'User ID', type: 'number', required: true })
  user: User;

  @ApiProperty({ description: 'Book ID', type: 'number', required: true })
  book: Book;

  @ApiProperty({
    description: 'This is the comment',
    type: 'string',
    required: true,
  })
  comment: string;
}

export class UpdateCommentDTO {
  @ApiProperty({ description: 'User ID', type: 'number', required: true })
  userId: number;

  @ApiProperty({ description: 'Book ID', type: 'number', required: true })
  bookId: number;

  @ApiProperty({
    description: 'This is the comment',
    type: 'string',
    required: true,
  })
  comment: string;
}
