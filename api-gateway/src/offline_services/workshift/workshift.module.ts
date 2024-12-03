import { forwardRef, Module } from "@nestjs/common";
import { WorkshiftServices } from "./workshift.service";
import { WorkshiftController } from "./workshift.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [WorkshiftController],
  providers: [WorkshiftServices],
  exports: [WorkshiftServices],
})
export class WorkshiftModule {}
