import { forwardRef, Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { OfflineServiceModule } from "../offline_services.module";
@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
