import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ShipmentDto } from "./dto/shipment.dto";

@Injectable()
export class ShipmentService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  // async onModuleInit() {
  //   this.offlineClient.subscribeToResponseOf('list-shipment');
  //   this.offlineClient.subscribeToResponseOf('detail-shipment');
  //   this.offlineClient.subscribeToResponseOf('create-shipment');
  //   this.offlineClient.subscribeToResponseOf('edit-shipment');
  //   this.offlineClient.subscribeToResponseOf('delete-shipment');
  //   await this.offlineClient.connect();
  // }
  async get (pagination: any, search: any) {
    const data = await this.offlineClient.send('list-shipment', { pagination, search }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-shipment', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found shipment", status: 404 })
    return response
  }

  async create (infoCreate: ShipmentDto) {
    const response = await this.offlineClient.send('create-shipment', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: ShipmentDto) {
    const response = await this.offlineClient.send('edit-shipment', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-shipment', {id}).toPromise();
    return response
  }
}
