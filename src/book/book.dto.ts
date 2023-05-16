import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/comments.entity';
import { User } from 'src/user/user.entity';

export class CreateBookDto {
  @ApiProperty({ description: 'Book Title', type: 'string', required: true })
  title: string;
  @ApiProperty({ description: 'Book Author', type: 'number', required: true })
  author: User;
  @ApiProperty({ description: 'Book Review', type: 'string', required: false })
  reviews: string;
}

export class UpdateBookDto {
  @ApiProperty({ description: 'Book Title', type: 'string', required: true })
  title: string;
  @ApiProperty({ description: 'Book Author', type: 'string', required: true })
  author: User;
}
