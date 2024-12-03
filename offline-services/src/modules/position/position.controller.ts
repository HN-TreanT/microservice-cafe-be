import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { POSITION_REPOSITORY } from "src/constants/repository_enum";
import { Position } from "./position.entity";
import { PositionCreate } from "./dto/position-create.dto";
import { Employee } from "../employee/employee.entity";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";


@Controller("position")
export class PositionController {
  constructor(@Inject(POSITION_REPOSITORY) private readonly positionRepository: typeof Position) {}
  @MessagePattern("create-position")
  async create(@Payload() positionCreate: PositionCreate) {
    return await this.positionRepository.create(positionCreate);
  }
  @MessagePattern("list-position")
  async get() {
    const { count, rows } = await this.positionRepository.findAndCountAll<Position>({
      where: {},
    });
    return rows;
  }
  @MessagePattern("detail-position")
  async getById(@Payload("id", ParseIntPipe) id: string) {
    const role = await this.positionRepository.findByPk(id);
    return role;
  }


  @MessagePattern("delete-position")
  async deleteById(@Param("id", ParseIntPipe) id: string) {
    const role = await this.positionRepository.findByPk(id);
    if (!role) throw new NotFoundException({ message: "not found role", status: false });
    await role.destroy();
    return true;
  }
}
