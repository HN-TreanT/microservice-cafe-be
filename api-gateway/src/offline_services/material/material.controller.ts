import { Controller, Get, Req, Post, Put, Delete, Param, Body, UseGuards, Query, Search } from "@nestjs/common";
import { MaterialSerivce } from "./material.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { MaterialEdit } from "./dto/material-edit.dto";
import { MaterialCreate } from "./dto/material-create.dto";
import { MaterialOrder } from "./dto/material-order.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@ApiTags('material')
@Controller("material")
export class MaterialController {
  constructor(private readonly materialService: MaterialSerivce) {}

  @Permissions("view_material")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query("search") search: string, @Query() order: MaterialOrder) {
    const pagination = req.pagination;
    const data = await this.materialService.get(pagination, search, order);
    return data;
  }

  @Permissions("view_material")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.materialService.getById(id);
    return data;
  }

  @Permissions("create_material")
  @UseGuards(PermissionGuard)
  @Post("")
  async create(@Body() infoCreate: MaterialCreate) {
    const data = await this.materialService.create(infoCreate);
    return data;
  }

  @Permissions("edit_material")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: MaterialEdit) {
    const data = await this.materialService.edit(id, editInfo);
    return data;
  }

  @Permissions("delete_material")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.materialService.deleteById(id);
    return true;
  }
}
