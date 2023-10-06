import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const configService = new ConfigService();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const DEV_INSTANCE = configService.getOrThrow('NODE_ENV') === 'development';

    response.status(status).json({
      statusCode: status,
      name: exception.name,
      message: exception['response'].description,
      ...(DEV_INSTANCE && { cause: exception['response'].cause?.stack }),
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
