import { forwardRef, Module } from "@nestjs/common";
import { MaterialSerivce } from "./material.service";
import { MaterialController } from "./material.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  providers: [MaterialSerivce],
  controllers: [MaterialController],
  exports: [MaterialSerivce],
})
export class MaterialModule {}
