import { Module } from '@nestjs/common';
import { CustomerAddressService } from './customer_address.service';
import { providers } from './customer_address.provider';
import { CustomerAddressController } from './customer_address.controller';

@Module({
  imports: [],
  controllers: [CustomerAddressController],
  exports: [CustomerAddressService],
  providers: [CustomerAddressService, ...providers]
})
export class CustomerAddressModule {}
