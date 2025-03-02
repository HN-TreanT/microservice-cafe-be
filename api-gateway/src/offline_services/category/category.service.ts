import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CategoryDto } from './dto/category-dto.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async get (pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-category', { pagination, filter }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-category', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found category", status: 404 })
    return response
  }

  async create (infoCreate: CategoryDto) {
    const response = await this.offlineClient.send('create-category', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: CategoryDto) {
    const response = await this.offlineClient.send('edit-category', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-category', {id}).toPromise();
    return response
  }
  
}
