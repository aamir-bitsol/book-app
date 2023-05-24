import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class CustomInterceptors implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return handler.handle().pipe(
      map((data) => {
        delete data.result.password;
        return data;
      }),
    );
  }
}
