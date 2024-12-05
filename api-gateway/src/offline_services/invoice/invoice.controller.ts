import { InvoiceService } from "./invoice.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { InvoiceCreate } from "./dto/invoice-create.dto";
import { InoviceEdit } from "./dto/invoice-edit.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Transform } from "class-transformer";
import { Op } from "sequelize";
import { FilterDto } from "./dto/filter.dto";
import { OrderInvoiceDto } from "./dto/order.dto";
import { SplitInvoice } from "./dto/split-invoice.dto";
import { CombineInvoice } from "./dto/combine-invoice.dto";
import { Payment } from "./dto/payment.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {  readFileSync } from "fs";
import { join } from "path";
import { Response } from "express";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";
@Controller("invoice")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}


  @Permissions("view_invoice")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: FilterDto, @Query() order: OrderInvoiceDto) {
    const pagination = req.pagination;
    const data = await this.invoiceService.get(pagination, filter, order);
    return data;
  }

  @Permissions("view_invoice")
  @UseGuards(PermissionGuard)
  @Get("/detail-by-id-table/:id_table")
  async getDetailInvoiceByIdTable(@Param("id_table") id_table: any,) {
    const data = await this.invoiceService.getDetailInvoiceByIdTable(id_table);
    return data;
  }

  @Permissions("view_invoice")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.invoiceService.getById(id);
    return data;
  }

  @Permissions("create_invoice")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() createInfo: InvoiceCreate) {
    const data = await this.invoiceService.create(createInfo);
    return data;
  }

  @Permissions("edit_invoice")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: InoviceEdit) {
    const data = await this.invoiceService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_invoice")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.invoiceService.deleteById(id);
    return true;
  }

  @Permissions("edit_invoice")
  @UseGuards(PermissionGuard)
  @Post("/split-order")
  async splitOrder(@Body() splitInvoice: SplitInvoice) {
    return await this.invoiceService.splitInvoice(splitInvoice);
  }

  @Permissions("edit_invoice")
  @UseGuards(PermissionGuard)
  @Post("/combine-inovice")
  async combineInvoice(@Body() combineInvoice: CombineInvoice) {
    return await this.invoiceService.combineInvocie(combineInvoice);
  }


  @Permissions("edit_invoice")
  @UseGuards(PermissionGuard)
  @Post("/payment/:invoice_id")
  async payment(@Param("invoice_id") invoice_id: number, @Body() paymentInfo: Payment) {
    console.log(invoice_id);
    return await this.invoiceService.payment(invoice_id, paymentInfo);
  }

  @Permissions("edit_invoice")
  @UseGuards(PermissionGuard)
  @Get("/complete-invoice/:id")
  async test(@Param("id") id: number) {
    const data = await this.invoiceService.completeInvocie(id);
    return data;
  }

  @Permissions("view_invoice")
  @UseGuards(PermissionGuard)
  @Get("/over-view/get")
  async getOverView(@Query("time") time: string) {
    const data = await this.invoiceService.getOrverView(time);
    return data;
  }

  @Permissions("view_invoice")
  @UseGuards(PermissionGuard)
  @Get("/over-view/revenue-overview")
  async getRevenueOverview() {
    const data = await this.invoiceService.getRevenueOverview();
    return data;
  }

  // @ApiBearerAuth()
  // @Get("/file/report")
  // async exportReport(@Res() res: Response) {
  //  const data = await this.invoiceService.exportFileReport(res)
  // //  await this.invoiceService.insertCharts(res)
  // }

  // @ApiBearerAuth()
  // @Get("/file/bieudo")
  // async bieudo(@Res() res: Response) {
  //   const path = join(__dirname,'..','..','src/templates/excel/BIEUDO.xlsx')   
  //   const templatefile = readFileSync(path) 
  
  //   const data = await this.invoiceService.insertChartWithXlSXTemplate([], [], templatefile)
  //   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  //   res.setHeader('Content-Disposition', `attachment; filename=${`BieuDo.xlsx`}`);
  //   // await workbook.xlsx.write(res)
  //   res.send(data

  // }

}
