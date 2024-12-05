import { forwardRef, Module } from "@nestjs/common";
import { PromotionServices } from "./promotion.service";
import { PromotionController } from "./promotion.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  providers: [PromotionServices],
  controllers: [PromotionController],
  exports: [PromotionServices],
})
export class PromotionModule {}
