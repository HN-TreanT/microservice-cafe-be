import { Controller, Get, UseGuards, Post, Req, Query, Param, Body, Put, Delete, ParseIntPipe } from "@nestjs/common";
import { SupplierSerivce } from "./supplier.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { SupplierCreate } from "./dto/supplier-create.dto";
import { SupplierEdit } from "./dto/supplier-edit.dto";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierSerivce) {}

  @MessagePattern("list-supplier")
  async get(@Payload() payload: any) {
    const {search, pagination} =  payload
    const data = await this.supplierService.get(pagination, search);
    return data;
  }

  @MessagePattern("detail-supplier")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.supplierService.getById(id);
    return data;
  }

  @MessagePattern("create-supplier")
  async create(@Payload() infoCreate: SupplierCreate) {
    const data = await this.supplierService.create(infoCreate);
    return data;
  }

  @MessagePattern("edit-supplier")
  async edit(@Payload() payload : { id: number,infoEdit: SupplierEdit}) {
    const {id, infoEdit} = payload;
    const data = await this.supplierService.edit(id, infoEdit);
    return data;
  }
  @MessagePattern("delete-supplier")
  async deleteById(@Payload("id", ParseIntPipe) id: number) {
    await this.supplierService.deleteById(id);
    return true;
  }
}
