import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { WorkshiftServices } from "./workshift.service";
import { WorkshiftCreate } from "./dto/workshift-create.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("workshift")
export class WorkshiftController {
  constructor(private readonly workshiftService: WorkshiftServices) {}

  @Permissions("view_workshift")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get() {
    const data = await this.workshiftService.get();
    return data;
  }

  @Permissions("view_workshift")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.workshiftService.getById(id);
    return data;
  }

  @Permissions("create_workshift")
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() createInfo: WorkshiftCreate) {
    const data = await this.workshiftService.create(createInfo);
    return data;
  }

  @Permissions("edit_workshift")
  @UseGuards(PermissionGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: WorkshiftCreate) {
    const data = await this.workshiftService.edit(id, infoEdit);
    return data;
  }

  @Permissions("delete_workshift")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.workshiftService.deleteById(id);
    return true;
  }
}
