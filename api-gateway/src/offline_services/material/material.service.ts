import { Inject, Injectable, NotFoundException, Req } from "@nestjs/common";

import { MaterialCreate } from "./dto/material-create.dto";
import { MaterialEdit } from "./dto/material-edit.dto";
import { ClientKafka } from "@nestjs/microservices";
import { MaterialOrder } from "./dto/material-order.dto";
@Injectable()
export class MaterialSerivce {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  // async onModuleInit() {
  //   this.offlineClient.subscribeToResponseOf('list-material');
  //   this.offlineClient.subscribeToResponseOf('detail-material');
  //   this.offlineClient.subscribeToResponseOf('create-material');
  //   this.offlineClient.subscribeToResponseOf('edit-material');
  //   this.offlineClient.subscribeToResponseOf('delete-material');
  //   await this.offlineClient.connect();
  // }
  async get (pagination: any, filter: any, order: MaterialOrder) {
    const data = await this.offlineClient.send('list-material', { pagination, filter, order }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-material', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found material", status: 404 })
    return response
  }

  async create (infoCreate: MaterialCreate) {
    const response = await this.offlineClient.send('create-material', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: MaterialEdit) {
    const response = await this.offlineClient.send('edit-material', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-material', {id}).toPromise();
    return response
  }
}
