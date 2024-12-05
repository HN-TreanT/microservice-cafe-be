import { Controller } from '@nestjs/common';
import { CustomerAddressService } from './customer_address.service';

@Controller('customer_address')
export class CustomerAddressController {
    constructor(private readonly service: CustomerAddressService) {}
}
