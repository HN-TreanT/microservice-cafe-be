import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { DetailComboCreate } from "./dto/detailcobom-create.dto";
import { DetailComboEdit } from "./dto/detailcombo-edit.dto";

@Injectable()
export class DetailComboService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async get (pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-detail-combo', { pagination, filter }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-detail-combo', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found detail-combo", status: 404 })
    return response
  }

  async create (infoCreate: DetailComboCreate) {
    const response = await this.offlineClient.send('create-detail-combo', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: DetailComboEdit) {
    const response = await this.offlineClient.send('edit-detail-combo', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-detail-combo', {id}).toPromise();
    return response
  }
}
