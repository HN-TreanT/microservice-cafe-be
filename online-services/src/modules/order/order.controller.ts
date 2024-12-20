import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderCreateDTO } from './dto/order-create.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly service: OrderService) {}

    @MessagePattern("list-order")
    async get(@Payload() payload: any) {
        const {pagination, filter} = payload;
        const data = await this.service.get(pagination, filter);
        return data;
    }


    @MessagePattern("create-order") 
    async create(@Payload() dto : OrderCreateDTO) {
        const data = await this.service.create(dto);
        return data
    }
    
}
