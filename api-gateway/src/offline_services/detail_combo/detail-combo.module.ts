import { forwardRef, Module } from "@nestjs/common";
import { DetailComboController } from "./detail-combo.controller";
import { DetailComboService } from "./detail-combo.service";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [DetailComboController],
  providers: [DetailComboService],
  exports: [],
})
export class DetailComboModule {}
