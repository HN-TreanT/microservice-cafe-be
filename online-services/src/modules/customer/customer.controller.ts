import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerDTO } from './dto/customer-dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly appService: CustomerService) {}

    @MessagePattern("list-customer-online")
    async get(@Payload() payload: any) {
        const {pagination, filter} = payload;
        const data = await this.appService.get(pagination, filter);
        return data;
    }

    @MessagePattern("create-customer-online") 
    async create(dto : CustomerDTO) {
        const data = await this.appService.create(dto);
    }

    @MessagePattern("edit-customer-online")
    async edit(@Payload() payload: { id: number, editInfo: CustomerDTO }) {
      const {id, editInfo} = payload; 
      const data = await this.appService.edit(id, editInfo);
      return data;
    }

    @MessagePattern("delete-customer-online")
    async deleteID(@Param("id", ParseIntPipe) id: number) {
        await this.appService.delete(id);
        return true;
    }
}
