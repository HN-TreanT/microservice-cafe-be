import { forwardRef, Module } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { InvoiceController } from "./invoice.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
