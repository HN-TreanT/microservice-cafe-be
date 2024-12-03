import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WorkshiftCreate } from "./dto/workshift-create.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class WorkshiftServices {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.offlineClient.subscribeToResponseOf('list-category');
    this.offlineClient.subscribeToResponseOf('detail-category');
    this.offlineClient.subscribeToResponseOf('create-category');
    this.offlineClient.subscribeToResponseOf('edit-category');
    this.offlineClient.subscribeToResponseOf('delete-category');
    await this.offlineClient.connect();
  }
  async get () {
    const data = await this.offlineClient.send('list-category', {}).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-category', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found category", status: 404 })
    return response
  }

  async create (createInfo: WorkshiftCreate) {
    const response = await this.offlineClient.send('create-category', JSON.stringify(createInfo)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: WorkshiftCreate) {
    const response = await this.offlineClient.send('edit-category', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-category', {id}).toPromise();
    return response
  }
}
