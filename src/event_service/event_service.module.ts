import { Module } from '@nestjs/common';
import { EventServiceController } from './event_service.controller';
import { EventsService } from './event_service.service';

@Module({
  controllers: [EventServiceController],
  providers: [EventsService],
})
export class EventServiceModule {}
