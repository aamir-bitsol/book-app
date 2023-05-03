import { Injectable } from '@nestjs/common';
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
    return await this.userRepository.create(user);
  }

  async getAllUsers(): Promise<any[]> {
    return await this.userRepository.find();
  }

  async getSpecificUser(id: number): Promise<any> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<any> {
    const userObj: User = await this.userRepository.findOne({ where: { id } });
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        userObj[key] = user[key];
      }
    }
    return await this.userRepository.save(userObj);
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({ id });
  }
}
