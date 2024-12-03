import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DTCheckInventoryCreate } from "./dto/dt-check-inventory-create.dto";
import { DTCheckInventoryEdit } from "./dto/dt-check-inventory-edit";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class DtCheckInventorService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async onModuleInit() {
    console.log("check init")
    this.offlineClient.subscribeToResponseOf('list-check-inventor');
    this.offlineClient.subscribeToResponseOf('detail-check-inventor');
    this.offlineClient.subscribeToResponseOf('create-check-inventor');
    this.offlineClient.subscribeToResponseOf('edit-check-inventor');
    this.offlineClient.subscribeToResponseOf('delete-check-inventor');
    await this.offlineClient.connect();
  }
  async get (pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-check-inventor', { pagination, filter }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-check-inventor', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found check-inventor", status: 404 })
    return response
  }

  async create (infoCreate: DTCheckInventoryCreate) {
    const response = await this.offlineClient.send('create-check-inventor', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: DTCheckInventoryEdit) {
    const response = await this.offlineClient.send('edit-check-inventor', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-check-inventor', {id}).toPromise();
    return response
  }
}
