import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CategoryDto } from './dto/category-dto.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}
  get (pagination: any, filter: any) {
    return this.offlineClient.send('list-category', {
      pagination,
      filter,
    });
  }

  getById (id: number) {
    return this.offlineClient.send('detail-category', {id});
  }

  create (infoCreate: CategoryDto) {
    return this.offlineClient.send('create-category', infoCreate);
  }

  edit (id: number, infoEdit: CategoryDto) {
    return this.offlineClient.send('edit-category', {
      id: id,
      infoEdit: infoEdit
    });
  }

  deleteById (id: number) {
    return this.offlineClient.send('delete-category', {id});
  }
  
}
