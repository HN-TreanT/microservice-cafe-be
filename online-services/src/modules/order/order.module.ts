import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { providers } from './order.provider';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from 'src/core/database/database.module';
import { AppModule } from 'src/app.module';

@Module({
  imports: [forwardRef(() => AppModule), DatabaseModule],
  
  controllers: [OrderController],
  exports: [OrderService],
  providers: [OrderService, ...providers]
})
export class OrderModule {}
