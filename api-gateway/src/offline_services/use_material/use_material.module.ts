import { forwardRef, Module } from "@nestjs/common";
import { UseMaterialService } from "./use_material.service";
import { UseMaterialController } from "./use_material.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [UseMaterialController],
  providers: [UseMaterialService],
  exports: [UseMaterialService],
})
export class UserMaterialModule {}
