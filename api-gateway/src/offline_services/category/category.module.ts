import { forwardRef, Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { OfflineServiceModule } from "../offline_services.module";
import { AuthModule } from "src/auth_services/auth.module";

@Module({
    imports: [forwardRef(() => OfflineServiceModule), AuthModule],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: []
})

export class CategoryModule{};