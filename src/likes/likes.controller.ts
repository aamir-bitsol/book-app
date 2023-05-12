import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { IncreaseLikeDTO, RemoveLikeDTO } from './likes.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  async getAllLikes() {
    return this.likesService.getAllLikes();
  }

  @Get(':id')
  async getLikesOfABook(@Param('id') id: number) {
    return this.likesService.getLikesOfABook(id);
  }

  @Post()
  async increaseLike(@Body() data: IncreaseLikeDTO) {
    return this.likesService.increaseLike(data);
  }

  @Post(':id')
  async removeLike(@Param('id') id: number, @Body() data: RemoveLikeDTO){
    return this.likesService.removeLike(id, data);
  }
}
