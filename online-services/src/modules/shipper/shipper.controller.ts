import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { ShipperDto } from './dto/shipper.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('shipper')
export class ShipperController {
  constructor(private readonly shipperService: ShipperService) {}

  @MessagePattern("create-shipper")
  create(@Payload() dto: ShipperDto) {
    return this.shipperService.create(dto);
  }

  @MessagePattern("list-shipper")
  findAll(@Payload() payload: any) {
    const {pagination, filter} = payload;
    return this.shipperService.findAll(pagination, filter);
  }
  
  @MessagePattern("edit-shipper")
  update(@Payload() payload: { id: number, dto: ShipperDto }) {
    const {id, dto} = payload; 
    return this.shipperService.update(id, dto);
  }
  @MessagePattern("delete-shipper")
  remove(@Payload("id", ParseIntPipe) id : number) {
    return this.shipperService.remove(id);
  }
}
