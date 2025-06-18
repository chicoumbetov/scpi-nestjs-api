import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const ip = request.ip; // Or use request.connection.remoteAddress if behind proxy and not configured

    this.logger.log(
      `Incoming Request - Method: ${method}, URL: ${url}, IP: ${ip}`,
    );
    this.logger.debug(`Request Body: ${JSON.stringify(request.body)}`); // Log request body (be careful with sensitive data)

    return next.handle().pipe(
      tap(
        (data) => {
          // This runs AFTER the controller method has returned a response
          this.logger.log(
            `Outgoing Response - Method: ${method}, URL: ${url} - Status: ${context.switchToHttp().getResponse().statusCode} - ${Date.now() - now}ms`,
          );
          this.logger.debug(`Response Data: ${JSON.stringify(data)}`); // Log response data (be careful with sensitive data)
        },
        (error) => {
          // This runs if an error occurs in the controller or subsequent interceptors/filters
          this.logger.error(
            `Request Error - Method: ${method}, URL: ${url} - Error: ${error.message} - ${Date.now() - now}ms`,
          );
          this.logger.error(`Error Details: ${JSON.stringify(error)}`);
        },
      ),
    );
  }
}
