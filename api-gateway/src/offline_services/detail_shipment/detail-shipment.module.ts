import { forwardRef, Module } from "@nestjs/common";
import { DetailShipmentController } from "./detail-shipment.controller";
import { DetailShipmentService } from "./detail-shipment.service";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [DetailShipmentController],
  providers: [DetailShipmentService],
  exports: [],
})
export class DetailShipmentModule {}
