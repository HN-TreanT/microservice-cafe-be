import { forwardRef, Module } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { InvoiceController } from "./invoice.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
