import { forwardRef, Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { OnlineServiceModule } from "../online_service.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
    imports: [forwardRef(() => OnlineServiceModule), AuthModule],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: []
})

export class CustomerModule{};