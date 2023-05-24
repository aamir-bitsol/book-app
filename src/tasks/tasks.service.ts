import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import randomWords from 'random-words';

@Injectable()
export class TasksService {
  constructor(private userService: UserService) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron('10 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 10');
  }

  @Interval(10000)
  handleInterval() {
    const randomWord: string = randomWords(1).pop();
    const data: CreateUserDto = {
      name: randomWord,
      address: '',
      contact: '',
      username: randomWord,
      password: randomWord,
      email: `${randomWord}@email.com`,
      image: '',
    };
    this.userService.createUser(data, ''); // After every 10 seconds, A new user will be created
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}
