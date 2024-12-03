import { Controller, Get, Post, Req, Query, Delete, Put, UseGuards, Param, Body } from "@nestjs/common";
import { DetailComboService } from "./detail-combo.service";
import { Op } from "sequelize";
import { PaginationGuard } from "src/guards/pagination.guard";

import { DetailComboCreate } from "./dto/detailcobom-create.dto";
import { DetailComboEdit } from "./dto/detailcombo-edit.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("detail-combo")
export class DetailComboController {
  constructor(private readonly detailComboService: DetailComboService) {}

  @Get("/")
  async get(@Req() req: any, @Query() filter: any) {
    const pagination = req.pagination;
    const data = await this.detailComboService.get(pagination, filter);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.detailComboService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() infoCreate: DetailComboCreate) {
    const data = await this.detailComboService.create(infoCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DetailComboEdit) {
    const data = await this.detailComboService.edit(id, infoEdit);
    return data;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.detailComboService.deleteById(id);
    return true;
  }
}
