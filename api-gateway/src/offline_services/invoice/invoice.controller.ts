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
@Controller("invoice")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get("/")
  async get(@Req() req: any, @Query() filter: FilterDto, @Query() order: OrderInvoiceDto) {
    const pagination = req.pagination;
    const data = await this.invoiceService.get(pagination, filter, order);
    return data;
  }

  @Get("/detail-by-id-table/:id_table")
  async getDetailInvoiceByIdTable(@Param("id_table") id_table: any,) {
    const data = await this.invoiceService.getDetailInvoiceByIdTable(id_table);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.invoiceService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() createInfo: InvoiceCreate) {
    const data = await this.invoiceService.create(createInfo);
    return data;
  }
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: InoviceEdit) {
    const data = await this.invoiceService.edit(id, infoEdit);
    return data;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.invoiceService.deleteById(id);
    return true;
  }
  @Post("/split-order")
  async splitOrder(@Body() splitInvoice: SplitInvoice) {
    return await this.invoiceService.splitInvoice(splitInvoice);
  }
  @Post("/combine-inovice")
  async combineInvoice(@Body() combineInvoice: CombineInvoice) {
    return await this.invoiceService.combineInvocie(combineInvoice);
  }

  @Post("/payment/:invoice_id")
  async payment(@Param("invoice_id") invoice_id: number, @Body() paymentInfo: Payment) {
    console.log(invoice_id);
    return await this.invoiceService.payment(invoice_id, paymentInfo);
  }

  @Get("/complete-invoice/:id")
  async test(@Param("id") id: number) {
    const data = await this.invoiceService.completeInvocie(id);
    return data;
  }

  @ApiBearerAuth()
  // @UseGuards(JwtAccessGuard)
  @Get("/over-view/get")
  async getOverView(@Query("time") time: string) {
    const data = await this.invoiceService.getOrverView(time);
    return data;
  }

  @ApiBearerAuth()
  // @UseGuards(JwtAccessGuard)
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
