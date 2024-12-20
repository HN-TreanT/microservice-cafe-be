import { Inject, Injectable } from '@nestjs/common';
import { OrderCreateDTO } from './dto/order-create.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrderService {
   constructor(
        @Inject('ONLINE_SERVICES') private readonly offlineClient: ClientKafka
      ) {}
  async create(dto: OrderCreateDTO) {
    const response = await this.offlineClient.send('create-order', JSON.stringify(dto)).toPromise();
    return response
  }

  async findAll(pagination: any, filter: any) {
    const response = await this.offlineClient.send('list-order',  { pagination, filter }).toPromise();
    return response
  }

  async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, dto: OrderCreateDTO) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
