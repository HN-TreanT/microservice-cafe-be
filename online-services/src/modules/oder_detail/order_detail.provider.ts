
import { ORDER_DETAIL_REPOSITORY } from "src/constants/repository_enum";
import { OrderDetail } from "src/entities/order_detail.entity";
export const providers = [{ provide: ORDER_DETAIL_REPOSITORY, useValue: OrderDetail }];
