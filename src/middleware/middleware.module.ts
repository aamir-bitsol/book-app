import { Module } from '@nestjs/common';
import { MiddlewareService } from './middleware.service';
import { MiddlewareController } from './middleware.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.MY_SECRET_KEY,
    }),
  ],
  providers: [MiddlewareService],
  controllers: [MiddlewareController],
})
export class MiddlewareModule {}
