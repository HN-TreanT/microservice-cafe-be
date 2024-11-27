import { forwardRef, Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { OfflineServiceModule } from "../offline_services.module";

@Module({
    imports: [forwardRef(() => OfflineServiceModule)],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: []
})

export class CategoryModule{};