import { Controller, Get, Post, Put, Delete, Req, Body, Param, UseGuards, Query, ParseIntPipe } from "@nestjs/common";
import { DtCheckInventorService } from "./detail-check-inventor.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { DTCheckInventoryCreate } from "./dto/dt-check-inventory-create.dto";
import { DTCheckInventoryEdit } from "./dto/dt-check-inventory-edit";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";


@Controller("detail-check-inventor")
export class DetailCheckInventorContronller {
  constructor(private readonly _serivce: DtCheckInventorService) {}

  @MessagePattern("list-check-inventor")
  async get(@Payload() payload: any) {
    const {pagination, id_detail_check} = payload

    const data = await this._serivce.get(pagination, {
      id_detail_check: id_detail_check,
    });
    return data;
  }

  @MessagePattern("detail-check-inventor")
  async getById(@Payload("id", ParseIntPipe) id : number) {
    const data = await this._serivce.getById(id);
    return data;
  }


  @MessagePattern("create-check-inventor")
  async create(@Payload() infoCreate: DTCheckInventoryCreate) {
    const data = await this._serivce.create(infoCreate);
    return data;
  }

  @MessagePattern("edit-check-inventor")
  async edit(@Payload() payload : {id: number,infoEdit: DTCheckInventoryEdit}) {
    const {id, infoEdit} = payload;
    const data = await this._serivce.edit(id, infoEdit);
    return data;
  }

  @MessagePattern("delete-check-inventor")
  async deleteById(@Payload("id", ParseIntPipe) id : number) {
    await this._serivce.deleteById(id);
    return true;
  }
}
