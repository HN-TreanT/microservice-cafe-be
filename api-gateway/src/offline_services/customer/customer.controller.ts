import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { CustomerService } from "./customer.service";

import { CustomerCreate } from "./dto/customer-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { CustomerEdit } from "./dto/customer-edit.dto";
import { Op } from "sequelize";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Permissions("view_customer")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query("search") search: string, @Query("email") email: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = search;
    }
    if (email) {
      //   filter["email"] = { [Op.substring]: email };
      filter["email"] = email;
    }
    const data = await this.customerService.get(pagination, filter);
    return data;
  }

  @Permissions("view_customer")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.customerService.getById(id);
    return data;
  }

  @Permissions("create_customer")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() promotionCreate: CustomerCreate) {
    const data = await this.customerService.create(promotionCreate);
    return data;
  }

  @Permissions("edit_customer")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() promotionEdit: CustomerEdit) {
    const data = await this.customerService.edit(id, promotionEdit);
    return data;
  }

  @Permissions("delete_customer")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.customerService.delete(id);
    return true;
  }
}
