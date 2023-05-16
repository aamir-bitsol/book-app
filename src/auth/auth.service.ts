import { AuthDTO, IPayload } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDTO): Promise<{ message: string }> {
    const username = authDto.username;
    const password = authDto.password;
    const user: User = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException(
        { success: false, error: true, message: 'Incorrect username!' },
        400,
      );
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new HttpException(
        { success: false, error: true, message: 'Incorrect Password!' },
        400,
      );
    }

    const payload: IPayload = { username, userId: user.id };
    return { message: await this.jwtService.signAsync(payload) };
  }
}
