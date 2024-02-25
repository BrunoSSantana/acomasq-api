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

    const name = exception.name;
    const message =
      exception['response'].description || exception['response'].message;
    const cause = exception['response'].cause?.stack;
    const provider = exception['response'].provider;
    const path = request.url;
    const timestamp = new Date().toISOString();

    response.status(status).json({
      statusCode: status,
      name,
      message,
      ...(DEV_INSTANCE && { cause, provider }),
      path,
      timestamp,
    });
  }
}
