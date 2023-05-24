import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        console.log("user middleware request");
        next();
    }
}


export function UserMiddlewareFunction(req:Request, res: Response, next: NextFunction){
    console.log("function middleware");
    next();
}