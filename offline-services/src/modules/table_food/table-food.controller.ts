import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { TableFoodService } from "./table-food.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { TableFoodDto } from "./dto/table-food.dto";
import { Op } from "sequelize";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiTags , ApiBearerAuth} from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";


@Controller("table-food")
export class TableController {
  constructor(private readonly tableSerivce: TableFoodService) {}

  @MessagePattern("list-table-food")
  async get(@Payload() payload: any) {
    const {filter, pagination} =  payload
    const data = await this.tableSerivce.get(pagination, filter);
    return data;
  }

  @MessagePattern("detail-table-food")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.tableSerivce.getById(id);
    return data;
  }

  @MessagePattern("create-table-food")
  async create(@Payload() createInfo: TableFoodDto) {
    const data = await this.tableSerivce.create(createInfo);
    return data;
  }

  @MessagePattern("edit-table-food")
  async edit(@Payload() payload: { id: number, editInfo: TableFoodDto }) {
    const { id, editInfo } = payload;
    const data = await this.tableSerivce.update(id, editInfo);
    return data;
  }

  @MessagePattern("delete-table-food")
  async deleteById(@Payload("id") number: number) {
    await this.tableSerivce.deleteById(number);
    return true;
  }
}
