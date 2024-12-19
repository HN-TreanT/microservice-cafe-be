import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OnlineServiceServices {
  constructor(
    @Inject('ONLINE_SERVICES') private readonly client: ClientKafka
  ) {}

  async onModuleInit() {
    //customer
    this.client.subscribeToResponseOf('list-customer-online');
    this.client.subscribeToResponseOf('create-customer-online');
    this.client.subscribeToResponseOf('edit-customer-online');
    this.client.subscribeToResponseOf('delete-customer-online');

    this.client.subscribeToResponseOf('list-customer-address-online');
    this.client.subscribeToResponseOf('create-customer-address-online');
    this.client.subscribeToResponseOf('edit-customer-address-online');
    this.client.subscribeToResponseOf('delete-customer-address-online');

    this.client.subscribeToResponseOf('list-shipper');
    this.client.subscribeToResponseOf('create-shipper');
    this.client.subscribeToResponseOf('edit-shipper');
    this.client.subscribeToResponseOf('delete-shipper');
    await this.client.connect();  
  }

  
}
