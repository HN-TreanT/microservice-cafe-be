import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, Param } from "@nestjs/common";
import { UseMaterialService } from "./use_material.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { MaterialCreate } from "../material/dto/material-create.dto";
import { UseMaterialCreate } from "./dto/use-material-create.dto";
import { UseMaterialEdit } from "./dto/use-material-edit.dto";

import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("use-material")
export class UseMaterialController {
  constructor(private readonly useMaterialService: UseMaterialService) {}

  @Permissions("view_use_material")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.useMaterialService.get(pagination, {});
    return data;
  }

  @Permissions("view_use_material")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.useMaterialService.getById(id);
    return data;
  }

  @Permissions("create_use_material")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() createInfo: UseMaterialCreate) {
    const data = await this.useMaterialService.create(createInfo);
    return data;
  }

  @Permissions("create_use_material")
  @UseGuards(PermissionGuard)
  @Post("/createMany")
  async createMany(@Body() createInfo: UseMaterialCreate[]) {
    const data = await this.useMaterialService.createMany(createInfo);
    return data;
  }

  @Permissions("edit_use_material")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: UseMaterialEdit) {
    const data = await this.useMaterialService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_use_material")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.useMaterialService.deleteById(id);
    return true;
  }


}
