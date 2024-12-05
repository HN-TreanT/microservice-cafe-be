import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TablefoodInoviceService } from "./tablefood-invoice.service";

import { TblInvoiceCreate } from "./dto/tbf-invoice-create";
import { TblInvoiceEdit } from "./dto/tbl-inovice-edit.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@ApiTags("tablefood-invoice")
@Controller("tablefood-invoice")
export class TablefoodInoviceController {
  constructor(private readonly tablefoodInvoiceSerivce: TablefoodInoviceService) {}

  @Permissions("view_tablefood_invoice")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.tablefoodInvoiceSerivce.get(pagination, {});
    return data;
  }

  @Permissions("view_tablefood_invoice")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.tablefoodInvoiceSerivce.getById(id);
    return data;
  }

  @Permissions("create_tablefood_invoice")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() createInfo: TblInvoiceCreate) {
    const data = await this.tablefoodInvoiceSerivce.create(createInfo);
    return data;
  }


  @Permissions("edit_tablefood_invoice")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: TblInvoiceEdit) {
    const data = await this.tablefoodInvoiceSerivce.edit(id, infoEdit);
    return data;
  }
  
  @Permissions("delete_tablefood_invoice")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.tablefoodInvoiceSerivce.deleteById(id);
    return true;
  }
}
