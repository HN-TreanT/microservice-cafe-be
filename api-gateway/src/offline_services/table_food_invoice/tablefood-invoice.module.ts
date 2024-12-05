import { forwardRef, Module } from "@nestjs/common";
import { TablefoodInoviceController } from "./tablefood-invoice.controller";
import { TablefoodInoviceService } from "./tablefood-invoice.service";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [TablefoodInoviceController],
  providers: [TablefoodInoviceService],
  exports: [TablefoodInoviceService],
})
export class TablefoodInvoiceModule {}
