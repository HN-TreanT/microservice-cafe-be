import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { providers } from './payment.provider';
import { PaymentController } from './payment.controller';

@Module({
  imports: [],
  controllers: [PaymentController],
  exports: [PaymentService],
  providers: [PaymentService, ...providers]
})
export class PaymentModule {}
