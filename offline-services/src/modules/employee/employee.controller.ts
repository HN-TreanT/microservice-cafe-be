import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import EmployeeUpdate from "./dto/employee-update.dto";
import { EmployeeFilter } from "./dto/employee-filter.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { RolesGuard } from "src/guards/role.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import EmployeeCreate from "./dto/employee-create.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern("list-employee")
  async get(@Payload() payload : any) {
    const {pagination, filter} = payload;
    const data = await this.employeeService.get(pagination, filter);
    return data;
  }

  @MessagePattern("create-employee")
  async create( @Payload() infoCreate: EmployeeCreate) {
    const data = await this.employeeService.create(infoCreate);
    return data;
  }

  @MessagePattern("detail-employee")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.employeeService.getById(id);
    return data;
  }

  @MessagePattern("edit-employee")
  async edit(@Payload() payload: { id: number, editInfo: EmployeeUpdate }) {
    const {id, editInfo} = payload; 
    const data = await this.employeeService.update(id, editInfo);
    return data;
  }

  @MessagePattern("delete-employee")
  async deleteById(@Param("id", ParseIntPipe) id: number) {
    await this.employeeService.deleteById(id);
    return true;
  }
}
