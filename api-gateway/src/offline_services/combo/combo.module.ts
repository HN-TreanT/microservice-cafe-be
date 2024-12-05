import { forwardRef, Module } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { ComboController } from "./combo.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [ComboController],
  providers: [ComboService],
  exports: [],
})
export class ComboModule {}
