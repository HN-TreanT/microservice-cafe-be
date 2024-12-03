import { Controller, Get, Post, Put, Delete, UseGuards, Query, Param, Body, Req, ParseIntPipe } from "@nestjs/common";
import { InvoiceDetailService } from "./invoice-detail.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Op } from "sequelize";
import { InvoiceDetailCreate } from "./dto/invoice-detail-create";
import { InvoiceDetailEdit } from "./dto/invoice-detail-edit";
import { DtInvoiceFilter } from "./dto/dt-invoice-filter";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("invoice-detail")
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  
  @MessagePattern("list-invoice-detail")
  async get(@Payload() payload : any)  {
    const {pagination, filter } = payload;
    const data = await this.invoiceDetailService.get(pagination, filter);
    return data;
  }

  @MessagePattern("detail-invoice-detail")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.invoiceDetailService.getById(id);
    return data;
  }

  @MessagePattern("create-invoice-detail")
  async create(@Payload() infoCreate: InvoiceDetailCreate) {
    const data = await this.invoiceDetailService.create(infoCreate);
    return data;
  }
  @MessagePattern("edit-invoice-detail")
  @Put("/:id")
  async edit(@Payload() payload : { id: number,  infoEdit: InvoiceDetailEdit}) {
    const {id, infoEdit} = payload;
    const data = await this.invoiceDetailService.edit(id, infoEdit);
    return data;
  }
  @MessagePattern("delete-invoice-detail")
  async deleteById(@Payload("id", ParseIntPipe) id: number) {
    await this.invoiceDetailService.deleteById(id);
    return true;
  }
}
