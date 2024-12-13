import { Controller, Get, Req, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { Query } from "@nestjs/common";

import { Op } from "sequelize";
import { CustomerDTO } from "./dto/customer-dto";
import { PermissionGuard } from "src/guards/check-permission.guard";
import { Permissions } from "src/decorator/permission.decorator";


@Controller("online/customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService ) {}

  @Permissions("view_customer")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query("name") search: string, @Query("email") email: string) {
    const pagination = req.pagination;
    console.log(pagination)
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    if (email) {
      filter["email"] = email
    }
    const data = await this.customerService.get(pagination, filter);
    return data;
  }

  @Permissions("create_customer")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: CustomerDTO) {
    const data = await this.customerService.create(infoCreate);
    return data;
  }

  @Permissions("edit_customer")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: CustomerDTO) {
    const data = await this.customerService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_customer")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.customerService.deleteById(id);
    return true;
  }
}
