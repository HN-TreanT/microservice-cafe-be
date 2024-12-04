import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { authProviders } from './app.provider';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './constants/jwtConstant';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [DatabaseModule, 
    JwtModule.register({
      global: true,
      secret: jwtContants.secret,
      signOptions: { expiresIn: "30m" },
    }),
    LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService, ...authProviders, 
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    }
  ],
})
export class AppModule {}
