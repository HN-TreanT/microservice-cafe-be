import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { providers } from './order.provider';
import { OrderController } from './order.controller';

@Module({
  imports: [],
  controllers: [OrderController],
  exports: [OrderService],
  providers: [OrderService, ...providers]
})
export class OrderModule {}
