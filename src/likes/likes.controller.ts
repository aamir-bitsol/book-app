import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  Sse,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { IncreaseLikeDTO, RemoveLikeDTO } from './likes.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
  ) {}

  @ApiOperation({ summary: 'Get all the likes on every book' })
  @ApiResponse({ status: 200, description: 'Returns the created comment' })
  @ApiBadRequestResponse({
    description: 'Invalid User or Book ID or incomplete data',
    status: 400,
  })
  @Get('')
  async getAllLikes() {
    return this.likesService.getAllLikes();
  }
 

  @ApiOperation({ summary: 'Get likes of a specific book' })
  @ApiResponse({ status: 200, description: 'Returns the likes of given book' })
  @ApiBadRequestResponse({
    description: 'Invalid User or Book ID or incomplete data',
    status: 400,
  })
  @Get(':id')
  async getLikesOfABook(@Param('id') id: number) {
    return this.likesService.getLikesOfABook(id);
  }

  @ApiOperation({ summary: 'Like a book for given user' })
  @ApiResponse({ status: 200, description: 'Returns the liked book' })
  @ApiBadRequestResponse({
    description: 'Invalid User ID or Book ID or incomplete data',
    status: 400,
  })
  @Post('')
  async increaseLike(@Body() data: IncreaseLikeDTO) {
    return this.likesService.increaseLike(data);
  }

  @ApiOperation({ summary: 'Removes like of a specific book' })
  @ApiResponse({ status: 200, description: 'Remove the like' })
  @ApiBadRequestResponse({
    description: 'Invalid User ID or Book ID or incomplete data',
    status: 400,
  })
  @Delete('')
  async removeLike(
    @Body() data: RemoveLikeDTO,
  ) {
    return this.likesService.removeLike(data);
  }
}
