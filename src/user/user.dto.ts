import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of user', type: 'string', required: true })
  name: string;

  @ApiProperty({
    description: 'Contact of user',
    type: 'string',
    required: true,
  })
  contact: string;

  @ApiProperty({
    description: 'Address of user',
    type: 'string',
    required: true,
  })
  address: string;

  @ApiProperty({
    description: 'Username of user',
    type: 'string',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Password of user',
    type: 'string',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'Image of user',
    type: 'string',
    required: false,
  })
  image: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'Name of user', type: 'string' })
  name?: string;
  @ApiProperty({ description: 'Contact of user', type: 'string' })
  contact?: string;
  @ApiProperty({ description: 'Address of user', type: 'string' })
  address?: string;
  @ApiProperty({ description: 'Username of user', type: 'string' })
  username?: string;
  @ApiProperty({ description: 'Password of user', type: 'string' })
  password?: string;
  @ApiProperty({ description: 'Image of user', type: 'string' })
  image?: string;
}
