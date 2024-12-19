import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Put } from '@nestjs/common';
import { CustomerAddressService } from './customer_address.service';
import {  CustomerAddressDto } from './dto/customer_address.dto';
import { PermissionGuard } from 'src/guards/check-permission.guard';
import { Permissions } from 'src/decorator/permission.decorator';


@Controller('online/customer-address')
export class CustomerAddressController {
  constructor(private readonly customerAddressService: CustomerAddressService) {}

  @Permissions("create_customer_address")
  @UseGuards(PermissionGuard)
  @Post()
  create(@Body() dto: CustomerAddressDto) {
    return this.customerAddressService.create(dto);
  }

  @Permissions("view_customer_address")
  @UseGuards(PermissionGuard)
  @Get()
  findAll(@Req() req: any, @Query("id_customer") id_customer: number) {
    const pagination = req.pagination;
    let filter = {};
    if (id_customer) {
      filter["id_customer"] = id_customer;
    }
    return this.customerAddressService.findAll(pagination, filter);
  }

  @Permissions("edit_customer_address")
  @UseGuards(PermissionGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CustomerAddressDto) {
    return this.customerAddressService.update(id, dto);
  }

  @Permissions("delete_customer_address")
  @UseGuards(PermissionGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerAddressService.remove(id);
  }
}
