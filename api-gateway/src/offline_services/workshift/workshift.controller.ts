import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { WorkshiftServices } from "./workshift.service";
import { WorkshiftCreate } from "./dto/workshift-create.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@Controller("workshift")
export class WorkshiftController {
  constructor(private readonly workshiftService: WorkshiftServices) {}

  @Get("/")
  async get() {
    const data = await this.workshiftService.get();
    return data;
  }
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.workshiftService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() createInfo: WorkshiftCreate) {
    const data = await this.workshiftService.create(createInfo);
    return data;
  }
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: WorkshiftCreate) {
    const data = await this.workshiftService.edit(id, infoEdit);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.workshiftService.deleteById(id);
    return true;
  }
}
