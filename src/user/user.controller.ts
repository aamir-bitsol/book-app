import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, CreateUserDto } from './user.dto';
import { Response } from 'express';
import { User } from './user.entity';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns an array of users' })
  @Get()
  async getAllUsers(@Res() res: Response) {
    const users: Array<User> = await this.userService.getAllUsers();
    return res.status(202).json({
      success: true,
      error: false,
      data: users,
    });
  }

  @ApiOperation({ summary: 'Get a specific users' })
  @ApiResponse({ status: 200, description: 'Returns a single users' })
  @ApiParam({name: "id", required: true, description: "Integer value to get the specific user."})
  @Get(':id')
  async getSpecificUser(@Res() res: Response, @Param('id') id: number) {
    const user: User = await this.userService.getSpecificUser(id);
    return res.status(202).json({
      success: true,
      error: false,
      data: user,
    });
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'This API will create a user.' })
  @Post()
  async createUser(
    @Res() res: Response,
    @Body() user: CreateUserDto,
  ): Promise<any> {
    const data: User = await this.userService.createUser(user);
    return res.status(201).json({
      success: true,
      error: false,
      data: data,
    });
  }

  @ApiOperation({ summary: 'Deletes a user' })
  @ApiParam({name: "id", required: true, description: "Integer value to delete the specific user."})
  @ApiResponse({ status: 200, description: 'This API will remove a user if the given ID exists in DB.' })
  @Delete(':id')
  async deleteUser(
    @Param('id') @Res() res: Response,
    id: number,
  ): Promise<any> {
    const deleted_user = await this.userService.deleteUser(id);
    return res.status(202).json({
      success: true,
      error: false,
      data: deleted_user,
    });
  }

  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({name: "id", required: true, description: "Integer value to update the specific user."})
  @ApiResponse({ status: 200, description: 'This API will update user information if the given ID exists in DB.' })
  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(id, user);
  }
}
