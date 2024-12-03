import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, Param, ParseIntPipe } from "@nestjs/common";
import { UseMaterialService } from "./use_material.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { MaterialCreate } from "../material/dto/material-create.dto";
import { UseMaterialCreate } from "./dto/use-material-create.dto";
import { UseMaterialEdit } from "./dto/use-material-edit.dto";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("use-material")
export class UseMaterialController {
  constructor(private readonly useMaterialService: UseMaterialService) {}

  @MessagePattern("list-use-material")
  async get(@Payload() payload: any) {
    const { pagination } = payload;
    const data = await this.useMaterialService.get(pagination, {});
    return data;
  }

  @MessagePattern("detail-use-material")
  async getById(@Payload("id") id: number) {
    const data = await this.useMaterialService.getById(id);
    return data;
  }

  @MessagePattern("create-use-material")
  async create(@Payload() createInfo: UseMaterialCreate) {
    const data = await this.useMaterialService.create(createInfo);
    return data;
  }
  @MessagePattern("create-many-use-material")
  async createMany(@Payload() createInfo: UseMaterialCreate[]) {
    const data = await this.useMaterialService.createMany(createInfo);
    return data;
  }

  @MessagePattern("edit-use-material")
  async edit(@Payload() payload : { id: number,  updateInfo: UseMaterialEdit }) {
    const { id, updateInfo } = payload;
    const data = await this.useMaterialService.edit(id, updateInfo);
    return data;
  }
  @MessagePattern("delete-use-material")
  async deleteById(@Payload("id", ParseIntPipe) id: number) {
    await this.useMaterialService.deleteById(id);
    return true;
  }


}
