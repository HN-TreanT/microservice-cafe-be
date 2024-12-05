import { forwardRef, Module } from "@nestjs/common";
import { PositionController } from "./position.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [PositionController],
  providers: [
  ],
})
export class PositionModule {}
