import { forwardRef, Module } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { ProductController } from "./product.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule)],
  providers: [ProductServices],
  controllers: [ProductController],
  exports: [ProductServices],
})
export class ProductModule {}
