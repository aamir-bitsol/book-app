import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto, CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<any> {
    try {
      const userObj: User = new User();
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          userObj[key] = user[key];
        }
      }
      return {
        success: true,
        error: false,
        result:await this.userRepository.save(userObj)
      };
    } catch (err) {
      return { 
        success: false,
        error: true,
        message: err.detail
       };
    }
  }

  async getAllUsers(): Promise<any[]> {
    return await this.userRepository.find();
  }

  async getSpecificUser(id: number): Promise<any> {
    try {
      const user:User = await this.userRepository.findOne({where:{id}});
      return {
        success: true,
        error: false,
        result:user
      };
    } catch (err) {
      return { 
        success: false,
        error: true,
        message: err.detail 
      };
    }
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<any> {
    try {
      const userObj: User = await this.userRepository.findOne({
        where: { id },
      });
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          userObj[key] = user[key];
        }
      }
      return await this.userRepository.save(userObj);
    } catch (err) {
      return { 
        success: false,
        error: true,
        message: err.detail
       };
    }
  }

  async deleteUser(id: number): Promise<any> {
    try {
      return await this.userRepository.delete(id);
    } catch (err) {
      return { 
        success: false,
        error: true,
        message: err.detail 
      };
    }
  }
}
