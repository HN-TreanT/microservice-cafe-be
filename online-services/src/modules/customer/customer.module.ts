import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { providers } from './customer.provider';
import { CustomerController } from './customer.controller';

@Module({
  imports: [],
  controllers: [CustomerController],
  exports: [CustomerService],
  providers: [CustomerService, ...providers]
})
export class CustomerModule {}
