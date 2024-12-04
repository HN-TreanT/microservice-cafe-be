import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TblInvoiceCreate } from "./dto/tbf-invoice-create";
import { TblInvoiceEdit } from "./dto/tbl-inovice-edit.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class TablefoodInoviceService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  // async onModuleInit() {
  //   this.offlineClient.subscribeToResponseOf('list-tablefood-invoice');
  //   this.offlineClient.subscribeToResponseOf('detail-tablefood-invoice');
  //   this.offlineClient.subscribeToResponseOf('create-tablefood-invoice');
  //   this.offlineClient.subscribeToResponseOf('edit-tablefood-invoice');
  //   this.offlineClient.subscribeToResponseOf('delete-tablefood-invoice');
  //   await this.offlineClient.connect();
  // }
  async get (pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-tablefood-invoice', { pagination }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-tablefood-invoice', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found tablefood-invoice", status: 404 })
    return response
  }

  async create (createInfo: TblInvoiceCreate) {
    const response = await this.offlineClient.send('create-tablefood-invoice', JSON.stringify(createInfo)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: TblInvoiceEdit) {
    const response = await this.offlineClient.send('edit-tablefood-invoice', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-tablefood-invoice', {id}).toPromise();
    return response
  }
}
