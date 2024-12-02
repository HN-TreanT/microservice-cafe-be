import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import EmployeeUpdate from "./dto/employee-update.dto";
import { EmployeeFilter } from "./dto/employee-filter.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import EmployeeCreate from "./dto/employee-create.dto";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get("/")
  async get(@Req() req: any, @Query() filter: EmployeeFilter) {
    const pagination = req.pagination;
    const data = await this.employeeService.get(pagination, filter);
    return data;
  }

  @Post("/")
  async create( @Body() infoCreate: EmployeeCreate) {
    const data = await this.employeeService.create(infoCreate);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.employeeService.getById(id);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: EmployeeUpdate) {
    const data = await this.employeeService.edit(id, editInfo);
    return data;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.employeeService.deleteById(id);
    return true;
  }
}
