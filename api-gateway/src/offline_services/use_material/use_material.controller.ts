import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, Param } from "@nestjs/common";
import { UseMaterialService } from "./use_material.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { MaterialCreate } from "../material/dto/material-create.dto";
import { UseMaterialCreate } from "./dto/use-material-create.dto";
import { UseMaterialEdit } from "./dto/use-material-edit.dto";

import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@Controller("use-material")
export class UseMaterialController {
  constructor(private readonly useMaterialService: UseMaterialService) {}

  @Get("/")
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.useMaterialService.get(pagination, {});
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.useMaterialService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() createInfo: UseMaterialCreate) {
    const data = await this.useMaterialService.create(createInfo);
    return data;
  }
  @Post("/createMany")
  async createMany(@Body() createInfo: UseMaterialCreate[]) {
    const data = await this.useMaterialService.createMany(createInfo);
    return data;
  }
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: UseMaterialEdit) {
    const data = await this.useMaterialService.edit(id, infoEdit);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.useMaterialService.deleteById(id);
    return true;
  }


}
