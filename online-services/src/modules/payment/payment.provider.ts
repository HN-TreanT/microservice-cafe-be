
import { PAYMENT_REPOSITORY } from "src/constants/repository_enum";
import { Payment } from "src/entities/payment.entity";
export const providers = [{ provide: PAYMENT_REPOSITORY, useValue: Payment }];
