
import { SHIPMENT_ONLINE_REPOSITORY } from "src/constants/repository_enum";
import { ShipmentOnline } from "src/entities/shipment_online.entity";
export const providers = [{ provide: SHIPMENT_ONLINE_REPOSITORY, useValue: ShipmentOnline }];
