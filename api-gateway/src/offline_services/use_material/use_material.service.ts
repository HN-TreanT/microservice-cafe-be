import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UseMaterialCreate } from "./dto/use-material-create.dto";
import { UseMaterialEdit } from "./dto/use-material-edit.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class UseMaterialService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async get (pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-use-material', { pagination, filter }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-use-material', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found use-material", status: 404 })
    return response
  }

  async create (createInfo: UseMaterialCreate) {
    const response = await this.offlineClient.send('create-use-material', JSON.stringify(createInfo)).toPromise();
    return response
  }

  async createMany (createInfo: UseMaterialCreate[]) {
    const response = await this.offlineClient.send('create-many-use-material', JSON.stringify(createInfo)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: UseMaterialEdit) {
    const response = await this.offlineClient.send('edit-use-material', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-use-material', {id}).toPromise();
    return response
  }
}
