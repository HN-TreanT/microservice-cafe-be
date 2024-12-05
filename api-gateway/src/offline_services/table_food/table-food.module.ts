import { forwardRef, Module } from "@nestjs/common";
import { TableFoodService } from "./table-food.service";
import { TableController } from "./table-food.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  providers: [TableFoodService],
  controllers: [TableController],
  exports: [TableFoodService],
})
export class TableModule {}
