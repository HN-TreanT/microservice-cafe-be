import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_ADDRESS_REPOSITORY } from 'src/constants/repository_enum';
import { CustomerAddress } from 'src/entities/customer_address.entity';

@Injectable()
export class CustomerAddressService {
    @Inject(CUSTOMER_ADDRESS_REPOSITORY) private readonly repository: typeof CustomerAddress
}
