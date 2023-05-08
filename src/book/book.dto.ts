import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  author: string;
}

export class UpdateBookDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  author: string;
}
