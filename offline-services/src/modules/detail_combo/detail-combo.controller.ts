import { Controller, Get, Post, Req, Query, Delete, Put, UseGuards, Param, Body, ParseIntPipe } from "@nestjs/common";
import { DetailComboService } from "./detail-combo.service";
import { Op } from "sequelize";
import { PaginationGuard } from "src/guards/pagination.guard";

import { DetailComboCreate } from "./dto/detailcobom-create.dto";
import { DetailComboEdit } from "./dto/detailcombo-edit.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("detail-combo")
export class DetailComboController {
  constructor(private readonly detailComboService: DetailComboService) {}


  @MessagePattern("list-detail-combo")
  async get(@Payload() payload : any) {
    const {pagination, filter} = payload;
    const data = await this.detailComboService.get(pagination, filter);
    return data;
  }

  @MessagePattern("detail-detail-combo")
  async getById(@Payload("id", ParseIntPipe) id : number) {
    const data = await this.detailComboService.getById(id);
    return data;
  }

  @MessagePattern("create-detail-combo")
  async create(@Payload() infoCreate: DetailComboCreate) {
    const data = await this.detailComboService.create(infoCreate);
    return data;
  }

  @MessagePattern("edit-detail-combo")
  async edit(@Payload() payload : {id: number, infoEdit: DetailComboEdit}) {
    const {id, infoEdit} = payload
    const data = await this.detailComboService.edit(id, infoEdit);
    return data;
  }

  @MessagePattern("delete-detail-combo")
  async deleteById(@Payload("id", ParseIntPipe) id : number) {
    await this.detailComboService.deleteById(id);
    return true;
  }
}
