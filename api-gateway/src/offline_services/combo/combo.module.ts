import { forwardRef, Module } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { ComboController } from "./combo.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  providers: [ComboService],
  controllers: [ComboController],
  exports: [ComboService],
})
export class ComboModule {}
