import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { RpcException } from '@nestjs/microservices';
import { LoggerService } from "src/logger/custom.logger";
import { HttpArgumentsHost } from "@nestjs/common/interfaces/features/arguments-host.interface";
import { QueryFailedError } from "typeorm";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    
    // Handling error message and logging
    this.handleMessage(exception);

    // Ném lỗi vào RpcException để producer có thể nhận
    throw this.handleRpcException(exception);
  }

  private handleMessage(exception: HttpException | QueryFailedError | Error): void {
    let message = "Internal Server Error";

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack.toString();
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    this.logger.error(message);
  }

  private handleRpcException(exception: HttpException | QueryFailedError | Error): RpcException {
    let errorMessage = "Internal Server Error";
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      errorMessage = exception.message || "HTTP Exception occurred";
      statusCode = exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      errorMessage = `Database Error: ${exception.message}`;
      statusCode = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof Error) {
      errorMessage = exception.message || "An unexpected error occurred";
    }

    // Ném lỗi dưới dạng RpcException để trả về cho producer
    return new RpcException({
      statusCode,
      message: errorMessage,
    });
  }
}
