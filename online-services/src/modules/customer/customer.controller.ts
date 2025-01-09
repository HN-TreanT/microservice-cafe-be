import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerDTO } from './dto/customer-dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly appService: CustomerService) {}

  @MessagePattern('list-customer-online')
  async get(@Payload() payload: any) {
    const { pagination, filter } = payload;
    const data = await this.appService.get(pagination, filter);
    return data;
  }

  @MessagePattern('create-customer-online')
  async create(dto: CustomerDTO) {
    const data = await this.appService.create(dto);
    return data;
  }

  @MessagePattern('edit-customer-online')
  async edit(@Payload() payload: { id: number; infoEdit: CustomerDTO }) {
    const { id, infoEdit } = payload;
    const data = await this.appService.edit(id, infoEdit);
    return data;
  }

  @MessagePattern('delete-customer-online')
  async deleteID(@Payload('id', ParseIntPipe) id: number) {
    const res = await this.appService.delete(id);
    return res;
  }

  @MessagePattern('detail-customer-online')
  async detailCustomer(@Payload('id', ParseIntPipe) id: number) {
    const res = await this.appService.detail(id);
    return res;
  }
}
