import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DTCheckInventoryCreate } from "./dto/dt-check-inventory-create.dto";
import { DTCheckInventoryEdit } from "./dto/dt-check-inventory-edit";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class DtCheckInventorService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

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
