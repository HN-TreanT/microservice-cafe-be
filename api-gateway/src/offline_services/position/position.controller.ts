import {
  Body,
  Controller,
  Delete,
  Get,

  Inject,

  NotFoundException,

  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PositionCreate } from "./dto/position-create.dto";
import { ClientKafka } from "@nestjs/microservices";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";

@Controller("position")
export class PositionController {

  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  @Permissions("create_position")
  @UseGuards(PermissionGuard)
  @Post("/")
  async create(@Body() positionCreate: PositionCreate) {
    const data = await this.offlineClient.send('create-position', { positionCreate }).toPromise();
    return true
  }

  @Permissions("view_position")
  @UseGuards(PermissionGuard)
  @Get("/")
  async get() {
    const data = await this.offlineClient.send('list-position', {  }).toPromise();
    return data;
  }

  @Permissions("view_position")
  @UseGuards(PermissionGuard)
  @Get("/:id")
  async getById(@Param("id") id: string) {
    const data = await this.offlineClient.send('detail-position', { id }).toPromise();
    if (!data) throw new NotFoundException({ message: "not found position", status: false });
    return true
  }

  @Permissions("delete_position")
  @UseGuards(PermissionGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    const data = await this.offlineClient.send('delete-position', { id }).toPromise();
    return true
  }
}
