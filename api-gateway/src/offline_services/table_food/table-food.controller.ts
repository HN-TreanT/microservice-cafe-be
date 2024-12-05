import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { TableFoodService } from "./table-food.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { TableFoodDto } from "./dto/table-food.dto";
import { Op } from "sequelize";
import { ApiTags , ApiBearerAuth} from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("table-food")
export class TableController {
  constructor(private readonly tableSerivce: TableFoodService) {}

  @Permissions("view_table_food")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query("search") search: string, @Query("status") status: number) {
    let filter: any = {};
    if (search) filter.name = { [Op.substring]: search };
    if (!Number.isNaN(status)) filter.status = status;
    const pagination = req.pagination;
    const data = await this.tableSerivce.get(pagination, filter);
    return data;
  }

  @Permissions("view_table_food")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.tableSerivce.getById(id);
    return data;
  }


  @Permissions("create_table_food")
  @UseGuards(PermissionGuard)
  @Post("")
  async create(@Body() createInfo: TableFoodDto) {
    const data = await this.tableSerivce.create(createInfo);
    return data;
  }

  @Permissions("edit_table_food")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: TableFoodDto) {
    const data = await this.tableSerivce.edit(id, editInfo);
    return data;
  }

  @Permissions("delete_table_food")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.tableSerivce.deleteById(id);
    return true;
  }
}
