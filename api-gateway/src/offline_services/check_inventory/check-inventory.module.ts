import { forwardRef, Module } from "@nestjs/common";
import { CheckInventoryService } from "./check_inventory.service";;
import { CheckInventoryController } from "./check_inventory.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";
@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [CheckInventoryController],
  exports: [CheckInventoryService],
  providers: [CheckInventoryService]
})
export class CheckInventoryModule {}
