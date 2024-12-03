import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { TableFoodDto } from "./dto/table-food.dto";

@Injectable()
export class TableFoodService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.offlineClient.subscribeToResponseOf('list-table-food');
    this.offlineClient.subscribeToResponseOf('detail-table-food');
    this.offlineClient.subscribeToResponseOf('create-table-food');
    this.offlineClient.subscribeToResponseOf('edit-table-food');
    this.offlineClient.subscribeToResponseOf('delete-table-food');
    await this.offlineClient.connect();
  }
  async get (pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-table-food', { pagination, filter }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-table-food', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found table-food", status: 404 })
    return response
  }

  async create (infoCreate: TableFoodDto) {
    const response = await this.offlineClient.send('create-table-food', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: TableFoodDto) {
    const response = await this.offlineClient.send('edit-table-food', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-table-food', {id}).toPromise();
    return response
  }
}
