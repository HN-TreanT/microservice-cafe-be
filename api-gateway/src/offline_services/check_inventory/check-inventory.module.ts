import { forwardRef, Module } from "@nestjs/common";
import { CheckInventoryService } from "./check_inventory.service";;
import { CheckInventoryController } from "./check_inventory.controller";
import { OfflineServiceModule } from "../offline_services.module";
@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [CheckInventoryController],
  exports: [CheckInventoryService],
})
export class CheckInventoryModule {}
