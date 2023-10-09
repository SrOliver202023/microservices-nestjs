
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const bodyException = JSON.parse(JSON.stringify(exception.getResponse()))
    response
      .status(status)
      .json({
        message: bodyException?.message,
        erros: bodyException?.erros,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}