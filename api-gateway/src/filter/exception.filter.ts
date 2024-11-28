import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { LoggerService } from "src/logger/custom.logger";
import { HttpArgumentsHost } from "@nestjs/common/interfaces/features/arguments-host.interface";
import { RpcException } from "@nestjs/microservices";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  private static handleResponse(response: Response, exception: HttpException | QueryFailedError | RpcException | Error): void {
    let responseBody: any = { message: "Internal server error" };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
      statusCode = exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseBody = {
        status: false,
        statusCode: statusCode,
        message: exception.message,
      };
    } else if (exception instanceof RpcException) {
      const errorResponse = exception.getError();

      // Check if errorResponse is an object and has the expected properties
      if (errorResponse && typeof errorResponse === 'object') {
        responseBody = {
          status: false,
          statusCode: (errorResponse as any).statusCode || statusCode,
          message: (errorResponse as any).message || 'Internal Server Error',
        };
      } else {
        // If errorResponse is a string or unknown format
        responseBody = {
          status: false,
          statusCode: statusCode,
          message: 'Internal Server Error',
        };
      }
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // or set the status based on errorResponse
    } else if (exception instanceof Error) {
      responseBody = {
        status: false,
        statusCode: statusCode,
        message: exception.message,
      };
    }

    response.status(statusCode).json(responseBody);
  }

  catch(exception: HttpException | RpcException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    // Handle logging for the exception
    this.handleMessage(exception);

    // Handle the response
    AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(exception: HttpException | RpcException | QueryFailedError | Error): void {
    let message = "Internal Server Error";

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof RpcException) {
      const errorResponse = exception.getError();
      message = typeof errorResponse === 'object' ? JSON.stringify(errorResponse) : errorResponse.toString();
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack.toString();
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    // Log the message (can be adjusted based on your logging service)
    this.logger.error(message);
  }
}
