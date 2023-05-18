import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDTO {
  @ApiProperty({ description: 'User ID', type: 'number', required: true })
  user: number;

  @ApiProperty({ description: 'Book ID', type: 'number', required: true })
  book: number;

  @ApiProperty({
    description: 'This is the review',
    type: 'string',
    required: true,
  })
  review: string;
}
