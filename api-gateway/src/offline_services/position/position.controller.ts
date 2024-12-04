import {
  Body,
  Controller,
  Delete,
  Get,

  Inject,

  NotFoundException,

  Param,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PositionCreate } from "./dto/position-create.dto";
import { ClientKafka } from "@nestjs/microservices";

@Controller("position")
export class PositionController {

  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  // async onModuleInit() {
  //   this.offlineClient.subscribeToResponseOf('list-position');
  //   this.offlineClient.subscribeToResponseOf('detail-position');
  //   this.offlineClient.subscribeToResponseOf('create-position');
  //   this.offlineClient.subscribeToResponseOf('delete-position');
  //   await this.offlineClient.connect();
  // }

  @Post("/")
  async create(@Body() positionCreate: PositionCreate) {
    const data = await this.offlineClient.send('create-position', { positionCreate }).toPromise();
    return true
  }
  @Get("/")
  async get() {
    const data = await this.offlineClient.send('list-position', {  }).toPromise();
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    const data = await this.offlineClient.send('detail-position', { id }).toPromise();
    if (!data) throw new NotFoundException({ message: "not found position", status: false });
    return true
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    const data = await this.offlineClient.send('delete-position', { id }).toPromise();
    return true
  }
}
