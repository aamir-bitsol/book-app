import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CollectionModule } from './collection/collection.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventServiceModule } from './event_service/event_service.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'client'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: true,
    }),
    MulterModule.register({
      dest: '/uploads'
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    BookModule,
    UserModule,
    AuthModule,
    CollectionModule,
    CommentsModule,
    LikesModule,
    EventServiceModule,
    ReviewsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
