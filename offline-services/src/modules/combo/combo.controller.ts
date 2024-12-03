import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Op } from "sequelize";

import { ComboCreate } from "./dto/combo-create.dto";
import { ComboEdit } from "./dto/combo-edit.dto";
import { CheckValidMaterial } from "./dto/check-valid-material.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("combo")
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @MessagePattern("list-combo")
  async get(@Payload() payload: any) {
    const {pagination, search} = payload;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    console.log(filter["email"]);
    const data = await this.comboService.get(pagination, filter);
    return data;
  }

  @MessagePattern("detail-combo")
  async getById(@Payload("id", ParseIntPipe) id : number) {
    const data = await this.comboService.getById(id);
    return data;
  }

  @MessagePattern("create-combo")
  async create(@Payload(ValidationPipe) infoCreate: ComboCreate) {
    const data = await this.comboService.create(infoCreate);
    return data;
  }

  @MessagePattern("edit-combo")
  async edit(@Payload() payload: { id: number; infoEdit: ComboEdit }) {
    const {id, infoEdit} = payload;
    const data = await this.comboService.edit(id, infoEdit);
    return data;
  }

  @MessagePattern("delete-combo")
  async deleteById(@Payload("id", ParseIntPipe) id : number) {
    await this.comboService.deleteById(id);
    return true;
  }

  @Post("/check-valid-material")
  async checkValidMaterial(@Payload(ValidationPipe) info: CheckValidMaterial) {
    return await this.comboService.checkValidMaterial(info.id_combo, info.amount);
  }
}
