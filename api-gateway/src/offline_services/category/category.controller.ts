import { Controller, Get, Req, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Query } from "@nestjs/common";

import { Op } from "sequelize";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { CategoryDto } from "./dto/category-dto.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { PermissionGuard } from "src/guards/check-permission.guard";
import { Permissions } from "src/decorator/permission.decorator";


@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService ) {}

  // @Permissions("view_category")
  // @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    console.log(pagination)
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    const data = await this.categoryService.get(pagination, filter);
    return data;
  }


  // @Permissions("view_category")
  // @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.categoryService.getById(id);
    return data;
  }

  @Permissions("create_category")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: CategoryDto) {
    const data = await this.categoryService.create(infoCreate);
    return data;
  }

  @Permissions("edit_category")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: CategoryDto) {
    const data = await this.categoryService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_category")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.categoryService.deleteById(id);
    return true;
  }
}
