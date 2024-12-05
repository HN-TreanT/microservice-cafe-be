import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import EmployeeUpdate from "./dto/employee-update.dto";
import { EmployeeFilter } from "./dto/employee-filter.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import EmployeeCreate from "./dto/employee-create.dto";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Permissions("view_employee")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: EmployeeFilter) {
    const pagination = req.pagination;
    const data = await this.employeeService.get(pagination, filter);
    return data;
  }

  @Permissions("create_employee")
  @UseGuards(PermissionGuard)
  @Post("/")
  async create( @Body() infoCreate: EmployeeCreate) {
    const data = await this.employeeService.create(infoCreate);
    return data;
  }

  @Permissions("view_employee")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.employeeService.getById(id);
    return data;
  }

  @Permissions("edit_employee")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: EmployeeUpdate) {
    const data = await this.employeeService.edit(id, editInfo);
    return data;
  }


  @Permissions("delete_employee")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.employeeService.deleteById(id);
    return true;
  }
}
