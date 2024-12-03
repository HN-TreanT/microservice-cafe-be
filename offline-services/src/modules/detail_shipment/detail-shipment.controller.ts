import { Controller, Get, Post, Delete, Put, Req, Body, Param, Query, UseGuards, ParseIntPipe } from "@nestjs/common";
import { DetailShipmentService } from "./detail-shipment.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { DetailShipmentCreate } from "./dto/detail-shipment-create.dto";
import { DetailShipmentEdit } from "./dto/detail-shipment-edit";
import { DetailShipmentFilter } from "./dto/detail-shipment-filter";
import { query } from "express";
import { DetailShipmentOrder } from "./dto/detail-shipment-order";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("detail-shipment")
export class DetailShipmentController {
  constructor(private readonly detailShipmentService: DetailShipmentService) {}

  @MessagePattern("list-detail-shipment")
  async get(@Payload() payload : {pagination, filter: DetailShipmentFilter, order: DetailShipmentOrder}) {
    const {pagination, filter, order} = payload;
    const data = await this.detailShipmentService.get(pagination, filter, order);
    return data;
  }

  @MessagePattern("detail-detail-shipment")
  async getById(@Payload("id", ParseIntPipe) id : number) {
    const data = await this.detailShipmentService.getById(id);
    return data;
  }

  @MessagePattern("create-detail-shipment")
  async create(@Payload() infoCreate: DetailShipmentCreate) {
    const data = await this.detailShipmentService.create(infoCreate);
    return data;
  }

  @MessagePattern("edit-detail-shipment")
  async edit(@Payload() payload: { id: number, infoEdit: DetailShipmentEdit}) {
    const {id, infoEdit} = payload;
    const data = await this.detailShipmentService.edit(id, infoEdit);
    return data;
  }

  @MessagePattern("delete-detail-shipment")
  async deleteById(@Payload("id", ParseIntPipe) id : number) {
    await this.detailShipmentService.delete(id);
    return true;
  }
}
