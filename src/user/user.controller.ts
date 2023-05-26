import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Inject,
  ParseIntPipe,
  Query,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, CreateUserDto } from './user.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadValidator } from './file.validator';
import { diskStorage } from 'multer';
import path from 'path';
import { CustomInterceptors } from './custom.interceptor';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(FileUploadValidator)
    private readonly fileValidator: FileUploadValidator,
  ) { }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns an array of users' })
  @Get()
  async getAllUsers(@Query('page', ParseIntPipe) page: number = 1, @Query('pageSize', ParseIntPipe) pageSize: number = 10, @Req() req) {
    console.log(req.csrfToken())
    return await this.userService.getAllUsers(page, pageSize);
  }

  @ApiOperation({ summary: 'Get a specific users' })
  @ApiResponse({ status: 200, description: 'Returns a single users' })
  @ApiBadRequestResponse({ description: 'Invalid user ID', status: 400 })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Integer value to get the specific user.',
  })
  @Get(':id')
  async getSpecificUser(@Param('id', ParseIntPipe) id: number) {
    console.log('id');
    return await this.userService.getSpecificUser(id);
  }

  @ApiOperation({ summary: 'Get a specific users' })
  @ApiResponse({ status: 200, description: 'Returns a single users' })
  @ApiBadRequestResponse({ description: 'Invalid user ID', status: 400 })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Integer value to get the specific user.',
  })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'This API will create a user.' })
  @ApiBadRequestResponse({
    description:
      'Request Data is incomplete. Please double check the data for user.',
    status: 400,
  })
  @Post()
  @UseInterceptors(CustomInterceptors)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callBack) => {
          callBack(
            null,
            file.fieldname + '_' + Date.now() + path.extname(file.originalname),
          );
        },
      }),
      fileFilter: (req, file, callBack) => {
        console.log(file.originalname)
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callBack(new Error('Only image files are allowed!'), false);
        }
        callBack(null, true);
      }
    }),
  )
  async createUser(
    @Body() userData: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    const response = await this.userService.createUser(userData, image);
    return response;
  }

  @ApiOperation({ summary: 'Deletes a user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Integer value to delete the specific user.',
  })
  @ApiResponse({
    status: 200,
    description: 'This API will remove a user if the given ID exists in DB.',
  })
  @ApiBadRequestResponse({
    description: 'Given ID is invalid.',
    status: 400,
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<any> {
    return await this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Integer value to update the specific user.',
  })
  @ApiResponse({
    status: 200,
    description:
      'This API will update user information if the given ID exists in DB.',
  })
  @ApiBadRequestResponse({
    description:
      'Request Data is incomplete. Please double check the data for user.',
    status: 400,
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(id, user);
  }

  @Get('reviews/:id')
  getUserReviews(@Param('id') id: number) {
    return this.userService.getAllUserReviews(id);
  }
}
