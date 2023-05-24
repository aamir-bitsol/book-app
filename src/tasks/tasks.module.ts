import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UserModule } from 'src/user/user.module';
import { TasksController } from './tasks.controller';

@Module({
    imports:[UserModule],
    providers: [TasksService],
    controllers: [TasksController]
})
export class TasksModule {}
