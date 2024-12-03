import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, Req, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { ShipmentDto } from "./dto/shipment.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("shipment")
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get("/")
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    const data = await this.shipmentService.get(pagination, search);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.shipmentService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() infoCreate: ShipmentDto) {
    const data = await this.shipmentService.create(infoCreate);
    return data;
  }
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: ShipmentDto) {
    const data = await this.shipmentService.edit(id, infoEdit);
    return data;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.shipmentService.deleteById(id);
    return true;
  }

  // @UseInterceptors(FileInterceptor("file"))
  // @Post("/upload-excel")
  // async uploadExcel(@UploadedFile() file: Express.Multer.File) {
  //   const res = await this.shipmentService.uploadFileExcel(file);
  //   return res;
  // }
}
