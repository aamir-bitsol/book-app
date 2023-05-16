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
import { CommentsService } from './comments.service';
import { CreateCommentDTO, UpdateCommentDTO } from './comments.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentService: CommentsService,
  ) {}

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'Returns an array of comments' })
  @Get()
  async getAllComments() {
    return this.commentService.getAllComments();
  }

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 200, description: 'Returns the created comment' })
  @ApiBadRequestResponse({
    description: 'Invalid User or Book ID or incomplete data',
    status: 400,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createComment(@Body() commentData: CreateCommentDTO, @Request() req) {
    return this.commentService.createComment(commentData);
  }

  @ApiOperation({ summary: 'Updates the existing comment' })
  @ApiResponse({ status: 200, description: 'Returns the updated comment' })
  @ApiBadRequestResponse({
    description: 'Invalid comment ID or incomplete data',
    status: 400,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id to point the comment which needs to be updated',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateComment(@Param('id') id: number, @Body() data: UpdateCommentDTO) {
    return this.commentService.updateComment(id, data);
  }

  @ApiOperation({ summary: 'Removes the existing comment' })
  @ApiResponse({ status: 200, description: 'Returns deleted comment' })
  @ApiBadRequestResponse({ description: 'Invalid comment ID', status: 400 })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id to point the comment which needs to be removed',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  
  async deleteComment(@Param('id') id: number) {
    return this.commentService.deleteComment(id);
  }
}
