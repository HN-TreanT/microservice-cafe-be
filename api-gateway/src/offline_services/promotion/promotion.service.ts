import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PromotionCreate } from "./dto/promtion-create.dto";
import { PromotionEdit } from "./dto/promtion-edit.dto";
import { ClientKafka } from "@nestjs/microservices";
import { PromotionFilter } from "./dto/promotion-filter.dto";

@Injectable()
export class PromotionServices {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.offlineClient.subscribeToResponseOf('list-promotion');
    this.offlineClient.subscribeToResponseOf('detail-promotion');
    this.offlineClient.subscribeToResponseOf('create-promotion');
    this.offlineClient.subscribeToResponseOf('edit-promotion');
    this.offlineClient.subscribeToResponseOf('delete-promotion');
    await this.offlineClient.connect();
  }
  async get (pagination: any, filter: PromotionFilter) {
    const data = await this.offlineClient.send('list-promotion', { pagination, filter }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-promotion', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found promotion", status: 404 })
    return response
  }

  async create (infoCreate: PromotionCreate) {
    const response = await this.offlineClient.send('create-promotion', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: PromotionEdit) {
    const response = await this.offlineClient.send('edit-promotion', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-promotion', {id}).toPromise();
    return response
  }
}
