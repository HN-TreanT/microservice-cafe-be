import { forwardRef, Module } from "@nestjs/common";
import { PositionController } from "./position.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [PositionController],
  providers: [
  ],
})
export class PositionModule {}
