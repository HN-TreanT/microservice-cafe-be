
import { SHIPPER_REPOSITORY } from "src/constants/repository_enum";
import { Shipper } from "src/entities/shipper.entity";
export const providers = [{ provide: SHIPPER_REPOSITORY, useValue: Shipper }];
