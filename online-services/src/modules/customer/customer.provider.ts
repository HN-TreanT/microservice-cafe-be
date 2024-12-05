
import {CUSTOMER_REPOSITORY } from "src/constants/repository_enum";
import { Customer } from "src/entities/customer.entity";
export const providers = [{ provide: CUSTOMER_REPOSITORY, useValue: Customer }];
