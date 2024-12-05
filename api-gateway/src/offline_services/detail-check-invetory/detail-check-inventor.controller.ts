import { Controller, Get, Post, Put, Delete, Req, Body, Param, UseGuards, Query } from "@nestjs/common";
import { DtCheckInventorService } from "./detail-check-inventor.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { DTCheckInventoryCreate } from "./dto/dt-check-inventory-create.dto";
import { DTCheckInventoryEdit } from "./dto/dt-check-inventory-edit";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";


@Controller("detail-check-inventor")
export class DetailCheckInventorContronller {
  constructor(private readonly _serivce: DtCheckInventorService) {}

  @Permissions("view_detail_inventor")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query("id_detail_check") id_detail_check: number) {
    const pagination = req.pagination;

    const data = await this._serivce.get(pagination, {
      id_detail_check: id_detail_check,
    });
    return data;
  }

  @Permissions("view_detail_inventor")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this._serivce.getById(id);
    return data;
  }

  @Permissions("create_detail_inventor")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: DTCheckInventoryCreate) {
    const data = await this._serivce.create(infoCreate);
    return data;
  }

  @Permissions("edit_detail_inventor")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DTCheckInventoryEdit) {
    const data = await this._serivce.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_detail_inventor")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this._serivce.deleteById(id);
    return true;
  }
}
