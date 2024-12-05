import { forwardRef, Module } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { ShipmentController } from "./shipment.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
