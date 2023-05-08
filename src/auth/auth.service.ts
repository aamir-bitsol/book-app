import { AuthCredentialsDto, IPayload } from './authCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ message: string }> {
    const username = authCredentialsDto.username;
    const password = authCredentialsDto.password;
    // const user: User = await this.userRepository.findOne({where:{username}});
    const user = {username, password:"pass", id:1} // this is temporary user to run the code
    if (!user) {
      return { message: 'Incorrect credentials!' };
    }
    if (user.password !== authCredentialsDto.password) {
      return { message: 'Incorrect credentials!' };
    }
    const payload: IPayload = { username, userId: user.id };
    return { message: await this.jwtService.signAsync(payload) };
  }
}
