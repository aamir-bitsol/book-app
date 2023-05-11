import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO{
    @ApiProperty({ description: 'User ID', type: 'number', required: true })
    userId: number;

    @ApiProperty({ description: 'Book ID', type: 'number', required: true })
    bookId: number;
    
    @ApiProperty({ description: 'This is the comment', type: 'string', required: true })
    comment: string
}

export class UpdateCommentDTO{
    @ApiProperty({ description: 'User ID', type: 'number', required: true })
    userId: number;
    
    @ApiProperty({ description: 'Book ID', type: 'number', required: true })
    bookId: number;
    
    @ApiProperty({ description: 'This is the comment', type: 'string', required: true })
    comment: string
}
