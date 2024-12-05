import { Controller, Get, Post, Put, Delete, UseGuards, Query, Param, Body, Req } from "@nestjs/common";
import { InvoiceDetailService } from "./invoice-detail.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Op } from "sequelize";
import { InvoiceDetailCreate } from "./dto/invoice-detail-create";
import { InvoiceDetailEdit } from "./dto/invoice-detail-edit";
import { DtInvoiceFilter } from "./dto/dt-invoice-filter";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("invoice-detail")
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  @Permissions("view_invoice_detail")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: DtInvoiceFilter) {
    const pagination = req.pagination;
    const data = await this.invoiceDetailService.get(pagination, filter);
    return data;
  }

  @Permissions("view_invoice_detail")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.invoiceDetailService.getById(id);
    return data;
  }

  @Permissions("create_invoice_detail")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: InvoiceDetailCreate) {
    const data = await this.invoiceDetailService.create(infoCreate);
    return data;
  }

  @Permissions("edit_invoice_detail")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: InvoiceDetailEdit) {
    const data = await this.invoiceDetailService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_invoice_detail")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.invoiceDetailService.deleteById(id);
    return true;
  }
}
