import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { PromotionServices } from "./promotion.service";

import { PromotionCreate } from "./dto/promtion-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { PromotionEdit } from "./dto/promtion-edit.dto";
import { PromotionFilter } from "./dto/promotion-filter.dto";
import { Op } from "sequelize";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("promotion")
export class PromotionController {
  constructor(private readonly promotionService: PromotionServices) {}

  @Permissions("view_promotion")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: PromotionFilter) {
    let promotion_filter: any = {};
    const pagination = req.pagination;
    if (filter.name) promotion_filter.name = { [Op.substring]: filter.name };

    if (filter.condition) promotion_filter.condition = { [Op.lt]: filter.condition };
    const data = await this.promotionService.get(pagination, promotion_filter);
    return data;
  }


  @Permissions("view_promotion")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.promotionService.getById(id);
    return data;
  }

  @Permissions("create_promotion")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() promotionCreate: PromotionCreate) {
    const data = await this.promotionService.create(promotionCreate);
    return data;
  }

  @Permissions("edit_promotion")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() promotionEdit: PromotionEdit) {
    const data = await this.promotionService.edit(id, promotionEdit);
    return data;
  }

  @Permissions("delete_promotion")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.promotionService.deleteById(id);
    return true;
  }
}
