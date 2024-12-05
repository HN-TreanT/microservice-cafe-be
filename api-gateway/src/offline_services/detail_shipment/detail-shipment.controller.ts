import { Controller, Get, Post, Delete, Put, Req, Body, Param, Query, UseGuards } from "@nestjs/common";
import { DetailShipmentService } from "./detail-shipment.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { DetailShipmentCreate } from "./dto/detail-shipment-create.dto";
import { DetailShipmentEdit } from "./dto/detail-shipment-edit";
import { DetailShipmentFilter } from "./dto/detail-shipment-filter";
import { query } from "express";
import { DetailShipmentOrder } from "./dto/detail-shipment-order";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("detail-shipment")
export class DetailShipmentController {
  constructor(private readonly detailShipmentService: DetailShipmentService) {}

  @Permissions("view_detail_shipment")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: DetailShipmentFilter, @Query() order: DetailShipmentOrder) {
    const pagination = req.pagination;
    const data = await this.detailShipmentService.get(pagination, filter, order);
    return data;
  }

  @Permissions("view_detail_shipment")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.detailShipmentService.getById(id);
    return data;
  }

  @Permissions("create_detail_shipment")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: DetailShipmentCreate) {
    const data = await this.detailShipmentService.create(infoCreate);
    return data;
  }

  @Permissions("edit_detail_shipment")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DetailShipmentEdit) {
    const data = await this.detailShipmentService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_detail_shipment")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.detailShipmentService.deleteById(id);
    return true;
  }
}
