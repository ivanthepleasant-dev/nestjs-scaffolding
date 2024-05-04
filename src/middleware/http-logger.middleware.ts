import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Request ${req.method} ${req.originalUrl} ${res.statusCode}`,
    );
    next();
  }
}
