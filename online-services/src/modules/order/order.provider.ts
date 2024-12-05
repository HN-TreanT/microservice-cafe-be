
import { ORDER_REPOSITORY } from "src/constants/repository_enum";
import { Order } from "src/entities/order.entity";
export const providers = [{ provide: ORDER_REPOSITORY, useValue: Order }];
