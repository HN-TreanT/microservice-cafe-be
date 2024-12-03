import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, Req, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { ShipmentDto } from "./dto/shipment.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("shipment")
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @MessagePattern("list-shipment")
  async get(@Payload() payload: any) {
    const {pagination, search} = payload;
    const data = await this.shipmentService.get(pagination, search);
    return data;
  }

  @MessagePattern("detail-shipment")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.shipmentService.getById(id);
    return data;
  }

  @MessagePattern("create-shipment")
  async create(@Payload() infoCreate: ShipmentDto) {
    const data = await this.shipmentService.create(infoCreate);
    return data;
  }

  @MessagePattern("edit-shipment")
  async edit(@Payload() payload :{ id: any, infoEdit: ShipmentDto}) {
    const { id, infoEdit } = payload;
    const data = await this.shipmentService.edit(id, infoEdit);
    return data;
  }

  @MessagePattern("delete-shipment")
  async deleteById(@Payload("id", ParseIntPipe) id: number) {
    await this.shipmentService.deleteById(id);
    return true;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(FileInterceptor("file"))
  @Post("/upload-excel")
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    const res = await this.shipmentService.uploadFileExcel(file);
    return res;
  }
}
