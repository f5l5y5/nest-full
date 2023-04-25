import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log('打印***exception', exception.getResponse());

    response.status(status).json({
      code: 0,
      data: exception.message,
      success: false,
      // errorMessage: exception.getResponse()?.message as string
      path: request.url,
      status,
      time: new Date().getTime(),
    });
  }
}
