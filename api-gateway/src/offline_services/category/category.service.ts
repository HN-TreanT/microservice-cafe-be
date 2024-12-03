import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { CategoryDto } from './dto/category-dto.dto';
import { catchError, throwError } from 'rxjs';
import { response } from 'express';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.offlineClient.subscribeToResponseOf('list-category');
    this.offlineClient.subscribeToResponseOf('detail-category');
    this.offlineClient.subscribeToResponseOf('create-category');
    this.offlineClient.subscribeToResponseOf('edit-category');
    this.offlineClient.subscribeToResponseOf('delete-category');
    await this.offlineClient.connect();
  }
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
