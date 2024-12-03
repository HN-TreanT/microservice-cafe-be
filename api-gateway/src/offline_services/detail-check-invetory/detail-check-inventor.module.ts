import { forwardRef, Module } from "@nestjs/common";
import { DetailCheckInventorContronller } from "./detail-check-inventor.controller";
import { DtCheckInventorService } from "./detail-check-inventor.service";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  providers: [DtCheckInventorService],
  controllers: [DetailCheckInventorContronller],
  exports: [DtCheckInventorService],
})
export class DTCheckInventorModule {}
