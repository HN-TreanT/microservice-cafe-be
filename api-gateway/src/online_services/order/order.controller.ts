import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateDTO } from './dto/order-create.dto';
import { PermissionGuard } from 'src/guards/check-permission.guard';
import { Permissions } from 'src/decorator/permission.decorator';
import { ChangeStatusOrderDTO } from './dto/change-status-order.dto';

@Controller('online/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Permissions("create_order")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() dto: OrderCreateDTO) {
    return this.orderService.create(dto);
  }

  @Permissions("view_order")
  @UseGuards(PermissionGuard) 
  @Get()
  async findAll(@Req() req: any, @Query("id_customer") id_customer: number) {
    const pagination = req.pagination;
    let filter = {};
    if (id_customer) {
      filter["id_customer"] = id_customer;
    }
    return this.orderService.findAll(pagination, filter);
  }

  @Permissions("edit_order")
  @UseGuards(PermissionGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: OrderCreateDTO) {
    return this.orderService.update(id, dto);
  }


  @Permissions("delete_order")
  @UseGuards(PermissionGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Permissions("edit_order")
  @UseGuards(PermissionGuard)
  @Post('/change-status')
  async changeStatusOrder(@Body() dto: ChangeStatusOrderDTO) {
    return this.orderService.changeStatusOrder(dto);
  }
}
