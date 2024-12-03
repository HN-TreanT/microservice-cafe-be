import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { ProductEdit } from "./dto/product-edit.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductFilter } from "./dto/product-filter.dto";
import { ProductOrder } from "./dto/product-order.dto";
import { ProductCreate } from "./dto/product-create.dto";
import { CheckValidMaterail } from "./dto/check-valid-material.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductServices) {}

  @MessagePattern("list-product")
  async get(@Payload() payload: {pagination: any,  filter: ProductFilter, order?: ProductOrder} ) {
    const { pagination, filter, order } = payload;
    const data = await this.productService.get(pagination, filter, order);
    return data;
  }

  @MessagePattern("detail-product")
  async getById(@Payload("id") id: number) {
    const data = await this.productService.getById(id);
    return data;
  }
  @MessagePattern("create-product")
  async create(@Payload() infoCreate: ProductCreate, @UploadedFile() image: Express.Multer.File) {
    const data = await this.productService.create(infoCreate, image);
    return data;
  }
  @MessagePattern("edit-product")
  async edit(@Payload() payload : { id: number, editInfo: ProductEdit, image: Express.Multer.File }) {
    const { id, editInfo, image } = payload;
    const data = await this.productService.edit(id, editInfo, image);
    return data;
  }
  @MessagePattern("delete-product")
  async deletById(@Payload("id", ParseIntPipe) id: number) {
    await this.productService.deleteById(id);
    return true;
  }

  @MessagePattern("check-valid-material")
  async checkValidMaterial(@Payload() info: CheckValidMaterail) {
    return await this.productService.checkValidMaterial(info.amount, info.id_product);
  }
}
