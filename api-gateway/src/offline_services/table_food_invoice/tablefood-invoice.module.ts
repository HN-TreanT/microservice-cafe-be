import { forwardRef, Module } from "@nestjs/common";
import { TablefoodInoviceController } from "./tablefood-invoice.controller";
import { TablefoodInoviceService } from "./tablefood-invoice.service";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [TablefoodInoviceController],
  providers: [TablefoodInoviceService],
  exports: [TablefoodInoviceService],
})
export class TablefoodInvoiceModule {}
