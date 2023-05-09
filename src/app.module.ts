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
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CollectionController } from './collection/collection.controller';
import { CollectionService } from './collection/collection.service';
import { CollectionModule } from './collection/collection.module';
import { Collection } from './collection/collection.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Book, User, Collection],
      synchronize: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    BookModule,
    UserModule,
    MiddlewareModule,
    AuthModule,
    CollectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
