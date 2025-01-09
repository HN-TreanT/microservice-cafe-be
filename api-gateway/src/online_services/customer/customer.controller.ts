import {
  Controller,
  Get,
  Req,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Query } from '@nestjs/common';

import { Op } from 'sequelize';
import { CustomerDTO } from './dto/customer-dto';
import { PermissionGuard } from 'src/guards/check-permission.guard';
import { Permissions } from 'src/decorator/permission.decorator';
import { CustomerCreateDTO } from './dto/customer-create-dto';
import { AuthService } from 'src/auth_services/auth.service';

@Controller('online/customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly authService: AuthService,
  ) {}

  @Permissions('view_customer')
  @UseGuards(PermissionGuard)
  @Get('/')
  async get(
    @Req() req: any,
    @Query('name') search: string,
    @Query('email') email: string,
  ) {
    const pagination = req.pagination;
    console.log(pagination);
    let filter = {};
    if (search) {
      filter['name'] = search;
    }
    if (email) {
      filter['email'] = email;
    }
    const data = await this.customerService.get(pagination, filter);
    return data;
  }
  // @Permissions("create_customer")
  // @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() infoCreate: CustomerCreateDTO) {
    const register_info = {
      username: infoCreate.username,
      password: infoCreate.password,
      name: infoCreate.name,
      id_role: infoCreate.id_role,
    };
    const register = await this.authService.register(register_info);
    if (!register) throw new BadRequestException('register failed');
    const user_create = {
      name: infoCreate.name,
      gender: infoCreate.gender,
      email: infoCreate.email,
      phone_number: infoCreate.phone_number,
      user_id: register.id,
      point: 0,
    };
    const data = await this.customerService.create(user_create);
    return data;
  }

  @Permissions('edit_customer')
  @UseGuards(PermissionGuard)
  @Put('/:id')
  async edit(@Param('id') id: number, @Body() infoEdit: CustomerDTO) {
    const data = await this.customerService.edit(id, infoEdit);
    if (!data) throw new NotFoundException('not found customer');
    return data;
  }

  @Permissions('delete_customer')
  @UseGuards(PermissionGuard)
  @Delete('/:id')
  async deleteById(@Param('id') id: number) {
    const res = await this.customerService.deleteById(id);
    if (res) {
      return true;
    }
    throw new NotFoundException('not found customer');
  }

  @Get('/detail')
  async detail(@Req() req: any, @Query('user_id') user_id: number) {
    const data = await this.customerService.detail(user_id);
    return data;
  }
}
