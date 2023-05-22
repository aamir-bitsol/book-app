import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateUserDto, CreateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { EventsService } from 'src/event_service/event_service.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventsService: EventsService,
  ) {}

  async createUser(user: CreateUserDto, image): Promise<any> {
    const username: string = user.username;
    const isUsernameExists: boolean = await this.userRepository.exist({
      where: { username },
    });
    if (isUsernameExists) {
      throw new HttpException(
        { success: false, error: true, message: 'Username already exists' },
        400,
      );
    }
    if (image) {
      user.image = `localhost:3000/files/${image.filename}`;
    }
    const userObj: User = await this.userRepository.create(user);
    const salt = await bcrypt.genSalt();
    userObj.password = await bcrypt.hash(user.password, salt);
    this.eventsService.emit({ message: 'User created successfully' });
    return {
      success: true,
      error: false,
      result: await this.userRepository.save(userObj),
    };
  }

  async getAllUsers(page: number, pageSize: number): Promise<any> {
    // const page: number = parseInt(req.query.page) || 1;
    // const pageSize: number = parseInt(req.query.pageSize) || 10;
    const offset: number = (page - 1) * pageSize;
    const limit: number = pageSize;
    const totalUsers: number = await this.userRepository.count();
    const totalPages: number = Math.ceil(totalUsers / pageSize);
    const allUsers: User[] = await this.userRepository.find({
      relations: ['books', 'comments', 'reviews'],
      select: {
        comments: { id: true, comment: true, book: { id: true } },
      },
      skip: offset,
      take: limit,
    });
    if (allUsers.length == 0) {
      throw new HttpException(
        { success: false, error: true, message: 'No Data Available' },
        400,
      );
    }
    return { success: true, error: false, data:{
      page,
      pageSize,
      totalUsers,
      totalPages,
      data: allUsers,

    }  };
  }

  async getSpecificUser(id: number): Promise<any> {
    const user: User = await this.userRepository.findOne({
      where: { id },
      relations: ['books', 'reviews', 'comments'],
    });
    if (!user) {
      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Unable to find the User',
        },
        400,
      );
    }
    return {
      success: true,
      error: false,
      message: user,
    };
  }

  async getSpecificUserByUsername(username: string): Promise<any> {
    const user: User = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Unable to find the User',
        },
        400,
      );
    }
    return {
      success: true,
      error: false,
      message: user,
    };
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<any> {
    const userObj: User = await this.userRepository.findOne({
      where: { id },
    });
    if (!userObj) {
      this.eventsService.emit({ message: 'Unable to update User information' });

      throw new HttpException(
        { success: false, error: true, message: 'Invalid User ID' },
        400,
      );
    }
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        userObj[key] = user[key];
      }
    }
    this.eventsService.emit({
      message: 'User information updated successfully',
    });

    return {
      success: true,
      error: false,
      message: await this.userRepository.save(userObj),
    };
  }

  async deleteUser(id: number): Promise<any> {
    const findUser: User = await this.userRepository.findOne({
      where: { id },
    });
    if (!findUser) {
      this.eventsService.emit({ message: 'Unable to Delete User' });
      throw new HttpException(
        { success: false, error: true, message: 'Unable to remove User' },
        400,
      );
    }
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      this.eventsService.emit({ message: 'User deleted successfully' });
      return {
        success: true,
        error: false,
        message: user,
      };
    } catch (err) {
      return {
        success: false,
        error: true,
        message: 'This user has a book. Unable to remove this user',
      };
    }
  }

  async getAllUserReviews(id: number) {
    const query: User = await this.userRepository.findOne({
      where: { id },
      relations: ['books', 'reviews'],
    });
    if (!query) {
      throw new HttpException(
        {
          success: false,
          error: true,
          message: 'Invalid User Id',
        },
        400,
      );
    }
    return {
      success: true,
      error: false,
      message: query,
    };
  }
}
