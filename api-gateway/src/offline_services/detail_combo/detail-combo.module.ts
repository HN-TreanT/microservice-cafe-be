import { forwardRef, Module } from "@nestjs/common";
import { DetailComboController } from "./detail-combo.controller";
import { DetailComboService } from "./detail-combo.service";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [DetailComboController],
  providers: [DetailComboService],
  exports: [],
})
export class DetailComboModule {}
