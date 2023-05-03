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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Res() res: Response) {
    const users: Array<User> = await this.userService.getAllUsers();
    return res.status(202).json({
      success: true,
      error: false,
      data: users,
    });
  }

  @Get(":id")
  async getSpecificUser(@Res() res: Response, @Param('id') id: number) {
    const user: User = await this.userService.getSpecificUser(id);
    return res.status(202).json({
      success: true,
      error: false,
      data: user,
    });
  }

  @Post()
  async createUser(@Res() res: Response, @Body() user: CreateUserDto): Promise<any> {
    const data:User = await this.userService.createUser(user);
    return res.status(202).json({
      success: true,
      error: false,
      data: data,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') @Res() res:Response, id: number): Promise<any> {
    const deleted_user = await this.userService.deleteUser(id);
    return res.status(202).json({
      success: true,
      error: false,
      data: deleted_user,
    });
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(id, user);
  }
}
