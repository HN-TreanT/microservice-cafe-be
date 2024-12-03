import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { WorkshiftServices } from "./workshift.service";
import { WorkshiftCreate } from "./dto/workshift-create.dto";
import { Roles } from "src/decorator/role.decorator";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ROLES } from "src/constants/role.enum";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";


@Controller("workshift")
export class WorkshiftController {
  constructor(private readonly workshiftService: WorkshiftServices) {}

  @MessagePattern("list-workshift")
  async get() {
    const data = await this.workshiftService.get({});
    return data;
  }

  @MessagePattern("detail-workshift")
  async getById(@Payload("id", ParseIntPipe) id: number) {
    const data = await this.workshiftService.getById(id);
    return data;
  }

  @MessagePattern("create-workshift")
  async create(@Payload() createInfo: WorkshiftCreate) {
    const data = await this.workshiftService.create(createInfo);
    return data;
  }

  @MessagePattern("edit-workshift")
  async edit(@Payload() payload : { id: number,  updateInfo: WorkshiftCreate }) {
    const { id, updateInfo } = payload;
    const data = await this.workshiftService.edit(id, updateInfo);
    return data;
  }

  @MessagePattern("delete-workshift")
  async deleteById(@Payload("id", ParseIntPipe) id: number) {
    await this.workshiftService.delete(id);
    return true;
  }
}
