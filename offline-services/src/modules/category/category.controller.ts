import { Controller, Get, Req, Post, Put, Delete, Param, Body, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { UseGuards } from "@nestjs/common";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Query } from "@nestjs/common";

import { Op } from "sequelize";
import { CategoryDto } from "./dto/category-dto.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { EventPattern, MessagePattern, Payload, RpcException } from "@nestjs/microservices";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern("list-category")
  async get(@Payload() payload : any) {
    console.log("check category", payload)
    const {pagination, filter} = payload
    const data = await this.categoryService.get(pagination, filter);
    return data
  }

  @MessagePattern("detail-category")
  async getById(@Payload("id", ParseIntPipe) id : number) {
    const data = await this.categoryService.getById(id);
    if (!data) return null
    return data.get()
  }

  @MessagePattern("create-category")
  async create(@Payload(ValidationPipe) infoCreate: CategoryDto) {
    const data = await this.categoryService.create(infoCreate);
    return data.get();
  }

  @MessagePattern("edit-category")
  async edit(@Payload() payload: { id: number; infoEdit: CategoryDto }) {
    const { id, infoEdit } = payload;
    const data = await this.categoryService.edit(id, infoEdit);
    return data.get();
  }

  @MessagePattern("delete-category")
  async deleteById(@Payload("id", ParseIntPipe) id : number) {
    await this.categoryService.deleteById(id);
    return true;
  }
}
