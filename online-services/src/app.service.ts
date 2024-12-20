import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}


  async onModuleInit() {
    //customer
    this.offlineClient.subscribeToResponseOf('detail-product');
    this.offlineClient.connect()
 }
  getHello(): string {
    return 'Hello World!';
  }
}
