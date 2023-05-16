import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userService: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.MY_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne({ where: { id: payload.id } });
    if (!user) {
      throw new UnauthorizedException({message: "Invalid Token"});
    }

    return { id: user.id, username: user.username, email: user.email };
  }
}
