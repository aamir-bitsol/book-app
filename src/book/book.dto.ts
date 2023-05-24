import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class CreateBookDto {
  @ApiProperty({ description: 'Book Title', type: 'string', required: true })
  title: string;
  @ApiProperty({ description: 'Book Author', type: 'number array', required: true })
  author: [];
  @ApiProperty({ description: 'Book Review', type: 'string', required: false })
  reviews: string;
}

export class UpdateBookDto {
  @ApiProperty({ description: 'Book Title', type: 'string', required: true })
  title: string;
  @ApiProperty({ description: 'Book Author', type: 'string', required: true })
  author: User;
}
