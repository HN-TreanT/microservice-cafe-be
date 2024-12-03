import { forwardRef, Module } from "@nestjs/common";
import { TableFoodService } from "./table-food.service";
import { TableController } from "./table-food.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  providers: [TableFoodService],
  controllers: [TableController],
  exports: [TableFoodService],
})
export class TableModule {}
