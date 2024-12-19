import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerAddressService } from './customer_address.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerAddressDTO } from './dto/customer-address.dto';

@Controller('customer_address')
export class CustomerAddressController {
    constructor(private readonly service: CustomerAddressService) {}

    @MessagePattern("list-customer-address-online")
    async get(@Payload() payload: any) {
        const {pagination, filter} = payload;
        const data = await this.service.get(pagination, filter);
        return data;
    }

    @MessagePattern("create-customer-address-online") 
    async create(@Payload() dto : CustomerAddressDTO) {
        const data = await this.service.create(dto);
        return data
    }

    @MessagePattern("edit-customer-address-online")
    async edit(@Payload() payload: { id: number, dto: CustomerAddressDTO }) {
        const {id, dto} = payload; 
        const data = await this.service.edit(id, dto);
        return data;
    }

    @MessagePattern("delete-customer-address-online")
    async deleteID(@Payload("id", ParseIntPipe) id : number) {
        const res = await this.service.deleteById(id);
        return res;
    }
}
