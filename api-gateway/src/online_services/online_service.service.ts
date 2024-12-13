import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OnlineServiceServices {
  constructor(
    @Inject('ONLINE_SERVICES') private readonly client: ClientKafka
  ) {}

  async onModuleInit() {
    //customer
    this.client.subscribeToResponseOf('list-customer');
    this.client.subscribeToResponseOf('create-customer');
    this.client.subscribeToResponseOf('edit-customer');
    this.client.subscribeToResponseOf('delete-customer');
    await this.client.connect();  
  }

  
}
