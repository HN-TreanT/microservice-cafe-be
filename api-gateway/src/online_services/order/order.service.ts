import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderCreateDTO } from './dto/order-create.dto';
import { ClientKafka } from '@nestjs/microservices';
import { ChangeStatusOrderDTO } from './dto/change-status-order.dto';

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


  async update(id: number, dto: OrderCreateDTO) {
    const response = await this.offlineClient.send('edit-order', {
      id: id,
      dto: dto
    }).toPromise();
    if (response?.status === 404) {
        throw new NotFoundException(response?.message)
    } 
    if (response?.status === 400) {
      throw new BadRequestException(response?.message)
    } 
    return response
  }

  async remove(id: number) {
    const response = await this.offlineClient.send('delete-order', {id}).toPromise();
    if (response?.status === 404) throw new NotFoundException(response?.message)
    return response
  }
  async changeStatusOrder(dto: ChangeStatusOrderDTO) {
    const response = await this.offlineClient.send('change-status-order', JSON.stringify(dto)).toPromise();
    if (response?.status === 404) throw new NotFoundException(response?.message)
    return response
  }
}
