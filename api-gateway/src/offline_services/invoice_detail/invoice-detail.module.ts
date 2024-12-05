import { forwardRef, Module } from "@nestjs/common";
import { InvoiceDetailService } from "./invoice-detail.service";
import { InvoiceDetailController } from "./invoice-detail.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [InvoiceDetailController],
  providers: [ InvoiceDetailService],
  exports: [InvoiceDetailService],
})
export class InvoiceDetailModule {}
