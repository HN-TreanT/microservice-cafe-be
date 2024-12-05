import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InvoiceDetailCreate } from "./dto/invoice-detail-create";
import { InvoiceDetailEdit } from "./dto/invoice-detail-edit";
import { DtInvoiceFilter } from "./dto/dt-invoice-filter";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class InvoiceDetailService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}
  async get (pagination: any, filter: DtInvoiceFilter) {
    const data = await this.offlineClient.send('list-invoice-detail', { pagination, filter }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-invoice-detail', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found invoice-detail", status: 404 })
    return response
  }

  async create (infoCreate: InvoiceDetailCreate) {
    const response = await this.offlineClient.send('create-invoice-detail', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: InvoiceDetailEdit) {
    const response = await this.offlineClient.send('edit-invoice-detail', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-invoice-detail', {id}).toPromise();
    return response
  }
}
