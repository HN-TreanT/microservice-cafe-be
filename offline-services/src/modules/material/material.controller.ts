import { Controller, Get, Req, Post, Put, Delete, Param, Body, UseGuards, Query, Search, ParseIntPipe } from "@nestjs/common";
import { MaterialSerivce } from "./material.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { MaterialEdit } from "./dto/material-edit.dto";
import { MaterialCreate } from "./dto/material-create.dto";
import { MaterialOrder } from "./dto/material-order.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("material")
export class MaterialController {
  constructor(private readonly materialService: MaterialSerivce) {}

  @MessagePattern("list-material")
  async get(@Payload() payload: any) {
    const {pagination, order, search} = payload
    const data = await this.materialService.get(pagination, search, order);
    return data;
  }

  @MessagePattern("detail-material")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.materialService.getById(id);
    return data;
  }

  @MessagePattern("create-material")
  async create(@Payload() infoCreate: MaterialCreate) {
    const data = await this.materialService.create(infoCreate);
    return data;
  }

  @MessagePattern("edit-material")
  async edit(@Payload() payload: {id:  number, editInfo: MaterialEdit }) {
    const {id, editInfo} = payload;
    const data = await this.materialService.edit(id, editInfo);
    return data;
  }

  @MessagePattern("delete-material")
  async deleteById(@Payload("id", ParseIntPipe) id: number) {
    await this.materialService.delete(id);
    return true;
  }
}
