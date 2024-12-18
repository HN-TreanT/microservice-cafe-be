import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { PromotionServices } from "./promotion.service";

import { PromotionCreate } from "./dto/promtion-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { PromotionEdit } from "./dto/promtion-edit.dto";
import { PromotionFilter } from "./dto/promotion-filter.dto";
import { Op } from "sequelize";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { RolesGuard } from "src/guards/role.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("promotion")
export class PromotionController {
  constructor(private readonly promotionService: PromotionServices) {}

  @MessagePattern("list-promotion")
  async get(@Req() req: any, @Query() filter: PromotionFilter) {
    let promotion_filter: any = {};
    const pagination = req.pagination;
    if (filter.name) promotion_filter.name = { [Op.substring]: filter.name };

    if (filter.condition) promotion_filter.condition = { [Op.lt]: filter.condition };
    const data = await this.promotionService.get(pagination, promotion_filter);
    return data;
  }

  @MessagePattern("detail-promotion")
  async getById(@Param("id") id: number) {
    const data = await this.promotionService.getById(id);
    return data;
  }
  @MessagePattern("create-promotion")
  async create(@Payload() promotionCreate: PromotionCreate) {
    const data = await this.promotionService.create(promotionCreate);
    return data;
  }

  @MessagePattern("edit-promotion")
  async edit(@Payload() payload: {id:  number, promotionEdit: PromotionEdit }) {
    const {id, promotionEdit} = payload;
    const data = await this.promotionService.edit(id, promotionEdit);
    return data;
  }

  @MessagePattern("delete-promotion")
  async deleteById(@Payload("id", ParseIntPipe) id: number) {
    await this.promotionService.delete(id);
    return true;
  }
}
