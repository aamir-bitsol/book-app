import { LoggerService, Logger, ConsoleLogger } from '@nestjs/common';

export class MyLoggerService extends ConsoleLogger{
  error(message: any, stack?: string, context?: string): void{
    super.error(`Message: ${message}`)
  }
  log(message: any, stack?: string, context?: string): void{
    super.log(`Message: `, message)
  }
  debug(message: any, context?: string): void {
    super.debug(`Message: ${message}`);
  }
}
