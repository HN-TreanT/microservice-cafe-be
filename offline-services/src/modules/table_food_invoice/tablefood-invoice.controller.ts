import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TablefoodInoviceService } from "./tablefood-invoice.service";

import { TblInvoiceCreate } from "./dto/tbf-invoice-create";
import { TblInvoiceEdit } from "./dto/tbl-inovice-edit.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { RolesGuard } from "src/guards/role.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("tablefood-invoice")
export class TablefoodInoviceController {
  constructor(private readonly tablefoodInvoiceSerivce: TablefoodInoviceService) {}

  @MessagePattern("list-tablefood-invoice")
  async get(@Payload() payload: any) {
    const { pagination } = payload;
    const data = await this.tablefoodInvoiceSerivce.get(pagination, {});
    return data;
  }

  @MessagePattern("detail-tablefood-invoice")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.tablefoodInvoiceSerivce.getById(id);
    return data;
  }
  @MessagePattern("create-tablefood-invoice")
  async create(@Payload() createInfo: TblInvoiceCreate) {
    const data = await this.tablefoodInvoiceSerivce.create(createInfo);
    return data;

  }
  @MessagePattern("edit-tablefood-invoice")
  async edit(@Payload()  payload :  { id: number, infoEdit: TblInvoiceEdit }) {
    const { id, infoEdit } = payload;
    const data = await this.tablefoodInvoiceSerivce.edit(id, infoEdit);
    return data;
  }

  @MessagePattern("delete-tablefood-invoice")
  async deleteById(@Payload("id") id: number) {
    await this.tablefoodInvoiceSerivce.deleteById(id);
    return true;
  }
}
