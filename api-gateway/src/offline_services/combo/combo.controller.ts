import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Op } from "sequelize";

import { ComboCreate } from "./dto/combo-create.dto";
import { ComboEdit } from "./dto/combo-edit.dto";
import { CheckValidMaterial } from "./dto/check-valid-material.dto";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("combo")
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Permissions("view_combo")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    const data = await this.comboService.get(pagination, filter);
    return data;
  }

  @Permissions("view_combo")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.comboService.getById(id);
    return data;
  }

  @Permissions("create_combo")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: ComboCreate) {
    const data = await this.comboService.create(infoCreate);
    return data;
  }

  @Permissions("edit_combo")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: ComboEdit) {
    const data = await this.comboService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_combo")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.comboService.deleteById(id);
    return true;
  }
  
  @Permissions("view_combo")
  @UseGuards(PermissionGuard)
  @Post("/check-valid-material")
  async checkValidMaterial(@Body() info: CheckValidMaterial) {
    return await this.comboService.checkValidMaterial(info.id_combo, info.amount);
  }
}
