import { forwardRef, Module } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { ShipmentController } from "./shipment.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
