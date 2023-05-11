import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto, CreateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<any> {
    const username: string = user.username;
    const isUsernameExists: boolean =  await this.userRepository.exist({where:{username}})
    if(isUsernameExists){
      throw new HttpException(
        { success: false, error: true, message: 'Username already exists' },
        400,
      );
    }
    const userObj: User = new User();
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        userObj[key] = user[key];
      }
    }
    const salt = await bcrypt.genSalt();
    userObj.password = await bcrypt.hash(user.password, salt);

    return {
      success: true,
      error: false,
      result: await this.userRepository.save(userObj),
    };
  }

  async getAllUsers(): Promise<any> {
    const allUsers: User[] = await this.userRepository.find();
    if (allUsers.length == 0) {
      throw new HttpException(
        { success: false, error: true, message: 'No Data Available' },
        400,
      );
    }
    return {success: true, error: false, message: allUsers};
  }

  async getSpecificUser(id: number): Promise<any> {
    const user: User = await this.userRepository.findOne({ where: { id } });
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
    const user: User = await this.userRepository.findOne({ where: { username } });
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
      throw new HttpException(
        { success: false, error: true, message: 'Unable to remove User' },
        400,
      );
    }
    const user: any = await this.userRepository.delete(id);
    return {
      success: true,
      error: false,
      message: user,
    };
  }
}
