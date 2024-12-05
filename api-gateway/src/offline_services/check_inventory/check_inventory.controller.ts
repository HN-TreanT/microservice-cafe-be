import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, Param, UseInterceptors, ClassSerializerInterceptor, Query } from "@nestjs/common";
import { CheckInventoryService } from "./check_inventory.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { CheckInventoryDto } from "./dto/check-invenoty-dto.dto";
import { CheckInventoryFilter } from "./dto/check-iventory-filter.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { PermissionGuard } from "src/guards/check-permission.guard";
import { Permissions } from "src/decorator/permission.decorator";

@Controller("check-inventory")
export class CheckInventoryController {
  constructor(private readonly checkInventorySerivce: CheckInventoryService) {}


  @Permissions("view_check_inventory")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: CheckInventoryFilter) {
    const pagination = req.pagination;
    const data = await this.checkInventorySerivce.get(pagination, filter);
    // return data;
    return data;
  }

  @Permissions("view_check_inventory")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.checkInventorySerivce.getById(id);
    return data;
  }

  @Permissions("create_check_inventory")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: CheckInventoryDto) {
    const data = await this.checkInventorySerivce.create(infoCreate);
    return data;
  }

  @Permissions("edit_check_inventory")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: CheckInventoryDto) {
    const data = await this.checkInventorySerivce.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_check_inventory")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.checkInventorySerivce.delete(id);
    return true;
  }

  @Permissions("delete_check_inventory")
  @UseGuards(PermissionGuard)
  @Get("/synchronized-warehouse/:id")
  async synchronizedWarehouse(@Param("id") id: number) {
    return await this.checkInventorySerivce.synchronizedWarehouse(id);
  }
}
