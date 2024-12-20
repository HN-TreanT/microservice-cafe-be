import { Controller, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderCreateDTO } from './dto/order-create.dto';
import { ChangeStatusOrderDTO } from './dto/change-status-order.dto';

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


    @MessagePattern("edit-order") 
    async edit(@Payload() payload: { id: number, dto: OrderCreateDTO }) {
        const {id, dto} = payload;
        const data = await this.service.edit(id, dto);
        return data
    }

    @MessagePattern("delete-order")
    async deleteID(@Payload("id", ParseIntPipe) id : number) {
        const res = await this.service.remove(id);
        return res;
    }
    
    @MessagePattern("change-status-order") 
    async changeStatus(@Payload() dto: ChangeStatusOrderDTO) {
        const data = await this.service.changeStatusOrder(dto);
        return data
    }
}
