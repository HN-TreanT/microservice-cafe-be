import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WorkshiftCreate } from "./dto/workshift-create.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class WorkshiftServices {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}
  async get () {
    const data = await this.offlineClient.send('list-workshift', {}).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-workshift', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found workshift", status: 404 })
    return response
  }

  async create (createInfo: WorkshiftCreate) {
    const response = await this.offlineClient.send('create-workshift', JSON.stringify(createInfo)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: WorkshiftCreate) {
    const response = await this.offlineClient.send('edit-workshift', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-workshift', {id}).toPromise();
    return response
  }
}
