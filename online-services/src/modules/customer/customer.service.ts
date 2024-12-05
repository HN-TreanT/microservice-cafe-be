import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/constants/repository_enum';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomerService {
    @Inject(CUSTOMER_REPOSITORY) private readonly repository: typeof Customer
}
