import { forwardRef, Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
