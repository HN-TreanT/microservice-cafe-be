import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { CustomerCreate } from "./dto/customer-create.dto";
import { CustomerEdit } from "./dto/customer-edit.dto";
@Injectable()
export class CustomerService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}


  async onModuleInit() {
    this.offlineClient.subscribeToResponseOf('list-customer');
    this.offlineClient.subscribeToResponseOf('detail-customer');
    this.offlineClient.subscribeToResponseOf('create-customer');
    this.offlineClient.subscribeToResponseOf('edit-customer');
    this.offlineClient.subscribeToResponseOf('delete-customer');
    await this.offlineClient.connect();
  }

  async get(pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-customer', { pagination, filter}).toPromise();
    return data;
  }

  async getById(id: number){
    const response = await this.offlineClient.send('detail-customer', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found customer", status: 404 })
    return response
  }

  async create(infoCreate: CustomerCreate) {
    const response = await this.offlineClient.send('create-customer', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit(id: number, infoEdit: CustomerEdit){
    const response = await this.offlineClient.send('edit-customer', {
      id: id, 
      infoEdit: infoEdit
    }).toPromise();
    return response

  }

  async delete(id: number) {
    const response = await this.offlineClient.send('delete-customer', { id }).toPromise()
    return response
  }

}
