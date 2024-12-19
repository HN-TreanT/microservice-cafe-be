import { Inject, Injectable } from '@nestjs/common';
import { ShipperCreateDTO } from './dto/shipper-create-dto';
import { ShipperDto } from './dto/shipper.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ShipperService {
  constructor(
    @Inject('ONLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}
  async create(dto: ShipperDto) {
    const response = await this.offlineClient.send('create-shipper', JSON.stringify(dto)).toPromise();
    return response
  }

  async findAll(pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-shipper', { pagination, filter }).toPromise();
    return data;
  }
  async update(id: number, dto: ShipperDto) {
    const response = await this.offlineClient.send('edit-shipper', {
      id: id,
      dto: dto
    }).toPromise();
    return response
  }

  async remove(id: number) {
    const response = await this.offlineClient.send('delete-shipper', {id}).toPromise();
    return response
  }
}
