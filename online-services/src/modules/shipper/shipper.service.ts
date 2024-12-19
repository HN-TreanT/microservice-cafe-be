import { Inject, Injectable } from '@nestjs/common';
import { ShipperDto } from './dto/shipper.dto';
import { SHIPPER_REPOSITORY } from 'src/constants/repository_enum';
import { Shipper } from 'src/entities/shipper.entity';
import { Op } from 'sequelize';

@Injectable()
export class ShipperService {
   @Inject(SHIPPER_REPOSITORY) private readonly repository: typeof Shipper
  async create(dto: ShipperDto) {
    const shipper = await this.repository.create(dto)
    return shipper.get()
  }

  async findAll(pagination: any, filter: any) {
    if (filter?.name) {
          filter["name"] = {[Op.substring]: filter.name}
      }
      const { count, rows } = await this.repository.findAndCountAll({
        where: {...filter},
        ...pagination
    })
    const data = {
      count: count,
      data: rows
  }
  return data
  }

  async update(id: number, dto: ShipperDto) {
    const shipper = await this.repository.findByPk(id)
    if (!shipper) return null
    shipper.update(dto)
    shipper.save()
    return shipper.get()
  }

  async remove(id: number) {
    const shipper = await this.repository.findByPk(id)
    if (!shipper) return null
    await shipper.destroy()
    return true
  }
}
