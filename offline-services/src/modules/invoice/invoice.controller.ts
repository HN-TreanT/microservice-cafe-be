import { InvoiceService } from "./invoice.service";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
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
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { ROLES } from "src/constants/role.enum";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {  readFileSync } from "fs";
import { join } from "path";
import { Response } from "express";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("invoice")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}


  @MessagePattern("list-invoice")
  async get(@Payload() payload: {pagination:  any,filter: FilterDto,  order: OrderInvoiceDto}) {
    const {pagination, filter, order} = payload;
    const data = await this.invoiceService.get(pagination, filter, order);
    return data;
  }

  @MessagePattern("detail-by-id-table")
  async getDetailInvoiceByIdTable(@Payload("id_table", ParseIntPipe) id_table: any,) {
    const data = await this.invoiceService.getDetailInvoiceByIdTable(id_table);
    return data;
  }

  @MessagePattern("detail-invoice")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.invoiceService.getById(id);
    return data;
  }

  @MessagePattern("create-invoice")
  async create(@Payload() createInfo: InvoiceCreate) {
    const data = await this.invoiceService.create(createInfo);
    return data;
  }

  @MessagePattern("edit-invoice")
  async edit(@Payload() payload: {id : number,infoEdit: InoviceEdit}) {
    const {id, infoEdit} = payload;
    const data = await this.invoiceService.edit(id, infoEdit);
    return data;
  }

  @MessagePattern("delete-invoice")
  async deleteById(@Payload("id", ParseIntPipe) id: number) {
    await this.invoiceService.deleteById(id);
    return true;
  }

  @MessagePattern("split-order")
  async splitOrder(@Payload() splitInvoice: SplitInvoice) {
    return await this.invoiceService.splitInvoice(splitInvoice);
  }

  @MessagePattern("combine-inovice")
  async combineInvoice(@Payload() combineInvoice: CombineInvoice) {
    return await this.invoiceService.combineInvocie(combineInvoice);
  }

  @MessagePattern("payment")
  async payment(@Payload() payload : { invoice_id: number,paymentInfo: Payment}) {

    const {invoice_id, paymentInfo} = payload
    return await this.invoiceService.payment(invoice_id, paymentInfo);
  }

  @MessagePattern("complete-invoice")
  async test(@Payload("id") id: number) {
    const data = await this.invoiceService.completeInvocie(id);
    return data;
  }

  @MessagePattern("over-view")
  async getOverView(@Payload("time") time: string) {
    const data = await this.invoiceService.getOrverView(time);
    return data;
  }


  @MessagePattern("revenue-overview")
  async getRevenueOverview() {
    const data = await this.invoiceService.getRevenueOverview();
    return data;
  }

  @ApiBearerAuth()
  @Get("/file/report")
  async exportReport(@Res() res: Response) {
   const data = await this.invoiceService.exportFileReport(res)
  //  await this.invoiceService.insertCharts(res)
  }

  @ApiBearerAuth()
  @Get("/file/bieudo")
  async bieudo(@Res() res: Response) {
    const path = join(__dirname,'..','..','src/templates/excel/BIEUDO.xlsx')   
    const templatefile = readFileSync(path) 
  
    const data = await this.invoiceService.insertChartWithXlSXTemplate([], [], templatefile)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${`BieuDo.xlsx`}`);
    // await workbook.xlsx.write(res)
    res.send(data)


  }

}
