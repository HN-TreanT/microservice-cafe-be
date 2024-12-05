import { forwardRef, Module } from "@nestjs/common";
import { WorkshiftServices } from "./workshift.service";
import { WorkshiftController } from "./workshift.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [WorkshiftController],
  providers: [WorkshiftServices],
  exports: [WorkshiftServices],
})
export class WorkshiftModule {}
