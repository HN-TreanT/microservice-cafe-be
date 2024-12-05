
import { CUSTOMER_ADDRESS_REPOSITORY } from "src/constants/repository_enum";
import { CustomerAddress } from "src/entities/customer_address.entity";
export const providers = [{ provide: CUSTOMER_ADDRESS_REPOSITORY, useValue: CustomerAddress }];
