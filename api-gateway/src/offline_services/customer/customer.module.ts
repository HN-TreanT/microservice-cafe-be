import { forwardRef, Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
