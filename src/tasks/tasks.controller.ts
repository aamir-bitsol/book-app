import { TasksService } from './../../.history/src/user/user.task_20230524122653';
import { Controller,Post, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService:TasksService){}
    @Post()
    createCronJob(name:string, seconds: string){
    }
}
