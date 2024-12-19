import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { ShipperDto } from './dto/shipper.dto';
import { ShipperCreateDTO } from './dto/shipper-create-dto';
import { AuthService } from 'src/auth_services/auth.service';
import { PermissionGuard } from 'src/guards/check-permission.guard';
import { Permissions } from 'src/decorator/permission.decorator';

@Controller('online/shipper')
export class ShipperController {
  constructor(private readonly shipperService: ShipperService,  private readonly authService: AuthService) {}

  @Permissions("create_shipper")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() dto: ShipperCreateDTO) {
    const register_info = {
      username: dto.username,
      password: dto.password,
      name: dto.name,
      id_role: dto.id_role
    }
    const register = await this.authService.register(register_info)
    if (!register) throw new BadRequestException("register failed")
    const shipper_create = {
      name: dto.name,
      phone_number: dto.phone_number,
      user_id: register.id,
      }
    return this.shipperService.create(shipper_create);
  }

  @Permissions("view_shipper")
  @UseGuards(PermissionGuard)
  @Get()
   async findAll(@Req() req: any, @Query("name") search: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = search;
    }
    return this.shipperService.findAll(pagination, filter);
  }

  @Permissions("edit_shipper")
  @UseGuards(PermissionGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: ShipperDto) {
    const data = await this.shipperService.update(id, dto);
    if (!data) throw new NotFoundException("not found customer")
    return data;
  }


  @Permissions("delete_customer")
  @UseGuards(PermissionGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const res = await this.shipperService.remove(id);
    if (res) {
      return true
    }
    throw new NotFoundException("not found customer")
  }
}
