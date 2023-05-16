import { Controller, Sse, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventsService } from './event_service.service';

@Controller('event-service')
export class EventServiceController {
  constructor(private readonly eventsService: EventsService) {}

  @Sse('events')
  events(@Request() req): Observable<any> {
    return this.eventsService.subscribe();
  }
}
