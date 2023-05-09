import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDTO {
  @ApiProperty({ description: 'User ID', type: 'number', required: true })
  user_id: number;
  @ApiProperty({ description: 'Book ID', type: 'number', required: true })
  book_id: number;
  @ApiProperty({
    description: "Is the given book in user's wishlist or not",
    type: 'boolean',
    required: true,
  })
  is_in_wishlist: boolean;
}
