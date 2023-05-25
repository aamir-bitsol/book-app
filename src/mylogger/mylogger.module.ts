import { Module } from '@nestjs/common';
import { MyLoggerService } from './mylogger.service';

@Module({
  providers: [MyLoggerService]
})
export class MyLoggerModule {}
