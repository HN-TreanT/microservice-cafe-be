import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CustomerDTO } from './dto/customer-dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('ONLINE_SERVICES') private readonly offlineClient: ClientKafka,
  ) {}

  async get(pagination: any, filter: any) {
    const data = await this.offlineClient
      .send('list-customer-online', { pagination, filter })
      .toPromise();
    return data;
  }

  async create(infoCreate: CustomerDTO) {
    const response = await this.offlineClient
      .send('create-customer-online', JSON.stringify(infoCreate))
      .toPromise();
    return response;
  }

  async edit(id: number, infoEdit: CustomerDTO) {
    const response = await this.offlineClient
      .send('edit-customer-online', {
        id: id,
        infoEdit: infoEdit,
      })
      .toPromise();
    return response;
  }

  async deleteById(id: number) {
    const response = await this.offlineClient
      .send('delete-customer-online', { id })
      .toPromise();
    return response;
  }

  async detail(id: number) {
    const response = await this.offlineClient
      .send('detail-customer-online', { id })
      .toPromise();
    return response;
  }
}
