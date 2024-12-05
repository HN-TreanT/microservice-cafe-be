import { forwardRef, Module } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { ProductController } from "./product.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
  imports: [forwardRef(() => OfflineServiceModule), AuthModule],
  providers: [ProductServices],
  controllers: [ProductController],
  exports: [ProductServices],
})
export class ProductModule {}
