import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Book Title', type: 'string', required: true })
  title: string;
  @ApiProperty({ description: 'Book Author ID', type: 'number', required: true })
  author: string;
}

export class UpdateBookDto {
  @ApiProperty({ description: 'Book Title', type: 'string', required: true })
  title: string;
  @ApiProperty({ description: 'Book Author ID', type: 'number', required: true })
  author: string;
}
