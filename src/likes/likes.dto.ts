import { ApiProperty } from '@nestjs/swagger';

export class IncreaseLikeDTO{
    @ApiProperty({ description: 'User ID', type: 'number', required: true })
    userId: number;

    @ApiProperty({ description: 'Book ID', type: 'number', required: true })
    bookId: number;
}

export class RemoveLikeDTO{
    @ApiProperty({ description: 'User ID', type: 'number', required: true })
    userId: number;
    
    @ApiProperty({ description: 'Book ID', type: 'number', required: true })
    bookId: number;
}
