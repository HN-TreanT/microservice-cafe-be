
import { CUSTOMER_ADDRESS_REPOSITORY, CUSTOMER_REPOSITORY } from "src/constants/repository_enum";
import { CustomerAddress } from "src/entities/customer_address.entity";
import { Customer } from "src/entities/customer.entity";
export const providers = [{ provide: CUSTOMER_ADDRESS_REPOSITORY, useValue: CustomerAddress }, {provide: CUSTOMER_REPOSITORY, useValue: Customer}];
