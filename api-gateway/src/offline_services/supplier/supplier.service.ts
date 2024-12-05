import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { SupplierCreate } from "./dto/supplier-create.dto";
import { SupplierEdit } from "./dto/supplier-edit.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class SupplierSerivce {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async get (pagination: any, search: any) {
    const data = await this.offlineClient.send('list-supplier', { pagination, search }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-supplier', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found supplier", status: 404 })
    return response
  }

  async create (infoCreate: SupplierCreate) {
    const response = await this.offlineClient.send('create-supplier', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: SupplierEdit) {
    const response = await this.offlineClient.send('edit-supplier', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-supplier', {id}).toPromise();
    return response
  }
  
}
