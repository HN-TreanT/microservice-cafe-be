import { forwardRef, Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";
@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
