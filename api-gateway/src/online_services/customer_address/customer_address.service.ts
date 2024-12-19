import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerAddressDto } from './dto/customer_address.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CustomerAddressService {
    constructor(
      @Inject('ONLINE_SERVICES') private readonly offlineClient: ClientKafka
    ) {}
  async create(dto: CustomerAddressDto) {
    const response = await this.offlineClient.send('create-customer-address-online', JSON.stringify(dto)).toPromise();
    if (!response) throw new NotFoundException("not found customer")
    return response
  }

  async findAll(pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-customer-address-online', { pagination, filter }).toPromise();
    return data;
  }
  async update(id: number, dto: CustomerAddressDto) {
    const response = await this.offlineClient.send('edit-customer-address-online', {
      id: id,
      dto: dto
    }).toPromise();
    if (!response) throw new NotFoundException("not found customer address")
    return response
  }

  async remove(id: number) {
    const response = await this.offlineClient.send('delete-customer-address-online', {id}).toPromise();
    if (!response) throw new NotFoundException("not found customer address")
    return response
  }
}
