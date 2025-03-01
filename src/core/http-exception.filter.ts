import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
  
      // Lấy response từ exception
      const exceptionResponse = exception.getResponse();
      
      let message = exception.message;
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
      }
  
      response.status(status).json({
        statusCode: status,
        message: message,
        success: false,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
  }