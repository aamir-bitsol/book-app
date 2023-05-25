import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    cookieParser('secret')(req, res, next);
  }
}
