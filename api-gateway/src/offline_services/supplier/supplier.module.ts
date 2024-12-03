import { forwardRef, Module } from "@nestjs/common";
import { SupplierController } from "./supplier.controller";
import { SupplierSerivce } from "./supplier.service";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  controllers: [SupplierController],
  providers: [SupplierSerivce],
  exports: [SupplierSerivce],
})
export class SupplierModule {}
