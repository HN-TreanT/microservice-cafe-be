import { forwardRef, Module } from "@nestjs/common";
import { InvoiceDetailService } from "./invoice-detail.service";
import { InvoiceDetailController } from "./invoice-detail.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [InvoiceDetailController],
  providers: [ InvoiceDetailService],
  exports: [InvoiceDetailService],
})
export class InvoiceDetailModule {}
