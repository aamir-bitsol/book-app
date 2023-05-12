import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
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
import { NotificationService } from 'src/notification/notification.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns an array of users' })
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
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
  async getSpecificUser(@Param('id') id: number) {
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
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    const response = await this.userService.createUser(user);
    await this.notificationService.sendPushNotification("User-Created", "welcome", 'Welcome to our app')
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
}
