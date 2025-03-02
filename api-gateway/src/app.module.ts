import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfflineServiceModule } from './offline_services/offline_services.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';
import { TransformInterceptor } from './Interceptors/tranform.interceptor';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { PaginationMiddleware } from './middleware/pagination.middleware';
import { AuthModule } from './auth_services/auth.module';
import { OnlineServiceModule } from './online_services/online_service.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    OfflineServiceModule,
    OnlineServiceModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
