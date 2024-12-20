
import { ORDER_DETAIL_REPOSITORY, ORDER_REPOSITORY, SHIPMENT_ONLINE_REPOSITORY } from "src/constants/repository_enum";
import { Order } from "src/entities/order.entity";
import { OrderDetail } from "src/entities/order_detail.entity";
import { ShipmentOnline } from "src/entities/shipment_online.entity";
export const providers = [{ provide: ORDER_REPOSITORY, useValue: Order }, { provide: ORDER_DETAIL_REPOSITORY, useValue: OrderDetail }, { provide: SHIPMENT_ONLINE_REPOSITORY, useValue: ShipmentOnline }];
