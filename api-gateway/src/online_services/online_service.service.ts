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
    this.client.subscribeToResponseOf('delete-customer0-online');
    await this.client.connect();  
  }

  
}
