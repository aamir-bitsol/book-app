import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { EventsService } from 'src/event_service/event_service.service';
import { FileUploadValidator } from './file.validator';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, EventsService, FileUploadValidator],
  exports: [UserService],
})
export class UserModule {}
