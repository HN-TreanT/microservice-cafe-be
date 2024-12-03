import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { CustomerService } from "./customer.service";

import { CustomerCreate } from "./dto/customer-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { CustomerEdit } from "./dto/customer-edit.dto";
import { Op } from "sequelize";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern("list-customer")
  async get(@Payload() payload: any) {
    const {pagination, search, email} = payload;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    if (email) {
      filter["email"] = email;
    }
    const data = await this.customerService.get(pagination, filter);
    return data;
  }

  @MessagePattern("detail-customer")
  async getById(@Payload("id", ParseIntPipe) id : number) {
    const data = await this.customerService.getById(id);
    return data;
  }

  @MessagePattern("create-customer")
  async create(@Payload() promotionCreate: CustomerCreate) {
    const data = await this.customerService.create(promotionCreate);
    return data;
  }

  @MessagePattern("edit-customer")
  async edit(@Payload() payload : {id: number, promotionEdit: CustomerEdit}) {
    const {id, promotionEdit} = payload;
    const data = await this.customerService.edit(id, promotionEdit);
    return data;
  }


  @MessagePattern("delete-customer")
  async deleteById(@Payload("id", ParseIntPipe) id : number) {
    await this.customerService.delete(id);
    return true;
  }
}
