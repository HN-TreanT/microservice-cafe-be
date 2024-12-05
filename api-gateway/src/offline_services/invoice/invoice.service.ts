import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import {startOfDay, endOfDay, startOfWeek, endOfWeek , startOfMonth, endOfMonth, startOfYear, endOfYear} from "date-fns"
import {join} from 'path'
import {readFile, readFileSync, writeFileSync} from 'fs'
import { Cell,Row } from "exceljs";
import ExcelJS from "exceljs"
import moment from "moment";
import XlsxTemplate from "xlsx-template"
import { ClientKafka } from "@nestjs/microservices";
import { FilterDto } from "./dto/filter.dto";
import { OrderInvoiceDto } from "./dto/order.dto";
import { InvoiceCreate } from "./dto/invoice-create.dto";
import { InoviceEdit } from "./dto/invoice-edit.dto";
import { SplitInvoice } from "./dto/split-invoice.dto";
import { CombineInvoice } from "./dto/combine-invoice.dto";
import { Payment } from "./dto/payment.dto";
const XLSXChart: any = require("xlsx-chart")
const xlsxChart = new XLSXChart()
@Injectable()
export class InvoiceService {
  invoiceRepository: any;
  constructor(
   
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async getDetailInvoiceByIdTable(id_table: any) : Promise<any>{
    const data = await this.offlineClient.send('detail-by-id-table', { id_table }).toPromise();
    return data;
  }

  ///nếu time_pay = null lấy ra những invoice chưa thanh toán , status : lấy ra những invoice đã được nhà bếp làm xong
  async get(pagination: any, filter: FilterDto, order: OrderInvoiceDto) {
    const data = await this.offlineClient.send('list-invoice', { pagination, filter , order}).toPromise();
    return data;
  }

  async getById(id: number){
    const response = await this.offlineClient.send('detail-invoice', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found invoice", status: 404 })
    return response
  }

  async create(infoCreate: InvoiceCreate) {
    const response = await this.offlineClient.send('create-invoice', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit(id: number, infoEdit: InoviceEdit) {
    const response = await this.offlineClient.send('edit-invoice', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }
  async deleteById(id: number) {
    const response = await this.offlineClient.send('delete-invoice', {id}).toPromise();
    return response
  }

  async splitInvoice(splitInvoice: SplitInvoice) {
    const response = await this.offlineClient.send('split-order', {splitInvoice: splitInvoice}).toPromise();
    return response
  }

  async combineInvocie( combineInvocie: CombineInvoice) {
    const response = await this.offlineClient.send('combine-order', {combineInvocie: combineInvocie}).toPromise();
    return response
  }

  async payment(invoice_id: number, paymentInfo: Payment) {
    const response = await this.offlineClient.send('payment', {invoice_id: invoice_id, paymentInfo: paymentInfo}).toPromise();
    return response
  }

  async completeInvocie(id_invoice: number) {
    const response = await this.offlineClient.send('complete-invoice', {id: id_invoice}).toPromise();
    return response
  }

  async getOrverView(time: string) {
    const response = await this.offlineClient.send('over-view', {time: time}).toPromise();
    return response
  }

  async getRevenueOverview() {
    const response = await this.offlineClient.send('revenue-overview', {}).toPromise();
    return response
  }


}
