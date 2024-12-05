import { Controller, Get, Post, Req, Query, Delete, Put, UseGuards, Param, Body } from "@nestjs/common";
import { DetailComboService } from "./detail-combo.service";
import { Op } from "sequelize";
import { PaginationGuard } from "src/guards/pagination.guard";

import { DetailComboCreate } from "./dto/detailcobom-create.dto";
import { DetailComboEdit } from "./dto/detailcombo-edit.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("detail-combo")
export class DetailComboController {
  constructor(private readonly detailComboService: DetailComboService) {}

  @Permissions("view_detail_combo")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: any) {
    const pagination = req.pagination;
    const data = await this.detailComboService.get(pagination, filter);
    return data;
  }

  @Permissions("view_detail_combo")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.detailComboService.getById(id);
    return data;
  }

  @Permissions("create_detail_combo")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: DetailComboCreate) {
    const data = await this.detailComboService.create(infoCreate);
    return data;
  }

  @Permissions("edit_detail_combo")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DetailComboEdit) {
    const data = await this.detailComboService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_detail_combo")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.detailComboService.deleteById(id);
    return true;
  }
}
