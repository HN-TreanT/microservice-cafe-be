import { forwardRef, Module } from "@nestjs/common";
import { PromotionServices } from "./promotion.service";
import { PromotionController } from "./promotion.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  providers: [PromotionServices],
  controllers: [PromotionController],
  exports: [PromotionServices],
})
export class PromotionModule {}
