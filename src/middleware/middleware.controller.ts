import { Controller, Post, Body } from '@nestjs/common';
import { MiddlewareService } from './middleware.service';

@Controller('middleware')
export class MiddlewareController {
  constructor(private readonly middlewareService: MiddlewareService) {}
  @Post()
  signin(@Body() username: string, password: string) {
    return this.middlewareService.validateUser(username, password);
  }
}
