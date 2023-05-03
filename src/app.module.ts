import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from "./book/book.entity"
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Book, User],
      synchronize: true,
    }),
    BookModule,
    UserModule,
    MiddlewareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
