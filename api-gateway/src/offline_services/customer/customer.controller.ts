import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { CustomerService } from "./customer.service";

import { CustomerCreate } from "./dto/customer-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { CustomerEdit } from "./dto/customer-edit.dto";
import { Op } from "sequelize";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get("/")
  async get(@Req() req: any, @Query("search") search: string, @Query("email") email: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    if (email) {
      //   filter["email"] = { [Op.substring]: email };
      filter["email"] = email;
    }
    const data = await this.customerService.get(pagination, filter);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.customerService.getById(id);
    return data;
  }
  @Post()
  async create(@Body() promotionCreate: CustomerCreate) {
    const data = await this.customerService.create(promotionCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() promotionEdit: CustomerEdit) {
    const data = await this.customerService.edit(id, promotionEdit);
    return data;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.customerService.delete(id);
    return true;
  }
}
