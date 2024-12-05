import { Controller, Get, UseGuards, Post, Req, Query, Param, Body, Put, Delete } from "@nestjs/common";
import { SupplierSerivce } from "./supplier.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { SupplierCreate } from "./dto/supplier-create.dto";
import { SupplierEdit } from "./dto/supplier-edit.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@ApiTags('supplier')
@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierSerivce) {}

  @Permissions("view_supplier")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    const data = await this.supplierService.get(pagination, search);
    return data;
  }

  @Permissions("view_supplier")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.supplierService.getById(id);
    return data;
  }


  @Permissions("create_supplier")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: SupplierCreate) {
    const data = await this.supplierService.create(infoCreate);
    return data;
  }
  @Permissions("edit_supplier")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: SupplierEdit) {
    const data = await this.supplierService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_supplier")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.supplierService.deleteById(id);
    return true;
  }
}
