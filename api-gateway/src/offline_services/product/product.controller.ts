import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { ProductEdit } from "./dto/product-edit.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductFilter } from "./dto/product-filter.dto";
import { ProductOrder } from "./dto/product-order.dto";
import { ProductCreate } from "./dto/product-create.dto";
import { CheckValidMaterail } from "./dto/check-valid-material.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PermissionGuard } from "src/guards/check-permission.guard";
import { Permissions } from "src/decorator/permission.decorator";

@ApiTags('product')
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductServices) {}


  @Permissions("view_product")
  @UseGuards(PermissionGuard)
  @Get()
  async get(@Req() req: any, @Query() filter: ProductFilter, @Query() order?: ProductOrder) {
    const pagination = req.pagination;
    const data = await this.productService.get(pagination, filter, order);
    return data;
  }

  @Permissions("view_product")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.productService.getById(id);
    return data;
  }

  @Permissions("create_product")
  @UseGuards(PermissionGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Post("")
  async create(@Body() infoCreate: ProductCreate, @UploadedFile() image: Express.Multer.File) {
    const data = await this.productService.create(infoCreate, image);
    return data;
  }

  @Permissions("edit_product")
  @UseGuards(PermissionGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: ProductEdit, @UploadedFile() image: Express.Multer.File) {
    const data = await this.productService.edit(id, editInfo, image);
    return data;
  }

  @Permissions("delete_product")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deletById(@Param("id") id: number) {
    await this.productService.deleteById(id);
    return true;
  }
  
  @Permissions("view_product")
  @UseGuards(PermissionGuard)
  @Post("/check-valid-material")
  async checkValidMaterial(@Body() info: CheckValidMaterail) {
    return await this.productService.checkValidMaterial(info.amount, info.id_product);
  }
}
