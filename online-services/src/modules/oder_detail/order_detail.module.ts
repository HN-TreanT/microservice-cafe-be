import { Module } from '@nestjs/common';
import {OrderDetailService } from './order_detail.service';
import { providers } from './order_detail.provider';
import {OrderDetailController } from './order_detail.controller';

@Module({
  imports: [],
  controllers: [OrderDetailController],
  exports: [OrderDetailService],
  providers: [OrderDetailService, ...providers]
})
export class OrderDetailModule {}
