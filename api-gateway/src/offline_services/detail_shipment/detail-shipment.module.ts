import { forwardRef, Module } from "@nestjs/common";
import { DetailShipmentController } from "./detail-shipment.controller";
import { DetailShipmentService } from "./detail-shipment.service";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [DetailShipmentController],
  providers: [DetailShipmentService],
  exports: [],
})
export class DetailShipmentModule {}
