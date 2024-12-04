import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DetailShipmentCreate } from "./dto/detail-shipment-create.dto";
import { DetailShipmentEdit } from "./dto/detail-shipment-edit";
import { DetailShipmentFilter } from "./dto/detail-shipment-filter";
import { Op, Sequelize } from "sequelize";
import { DetailShipmentOrder } from "./dto/detail-shipment-order";
import { ClientKafka } from "@nestjs/microservices";
@Injectable()
export class DetailShipmentService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  // async onModuleInit() {
  //   this.offlineClient.subscribeToResponseOf('list-detail-shipment');
  //   this.offlineClient.subscribeToResponseOf('detail-detail-shipment');
  //   this.offlineClient.subscribeToResponseOf('create-detail-shipment');
  //   this.offlineClient.subscribeToResponseOf('edit-detail-shipment');
  //   this.offlineClient.subscribeToResponseOf('delete-detail-shipment');
  //   await this.offlineClient.connect();
  // }
  async get (pagination: any, filter: DetailShipmentFilter, order: DetailShipmentOrder) {
    const data = await this.offlineClient.send('list-detail-shipment', { pagination, filter, order }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-detail-shipment', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found detail-shipment", status: 404 })
    return response
  }

  async create (infoCreate: DetailShipmentCreate) {
    const response = await this.offlineClient.send('create-detail-shipment', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: DetailShipmentEdit) {
    const response = await this.offlineClient.send('edit-detail-shipment', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-detail-shipment', {id}).toPromise();
    return response
  }
}
