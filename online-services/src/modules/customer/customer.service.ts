import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from 'src/constants/repository_enum';
import { Customer } from 'src/entities/customer.entity';
import { CustomerFilterDTO } from './dto/customer-filter-dto';
import { Op } from 'sequelize';
import { CustomerDTO } from './dto/customer-dto';

@Injectable()
export class CustomerService {
  @Inject(CUSTOMER_REPOSITORY) private readonly repository: typeof Customer;

  async get(pagination: any, filter: any): Promise<any> {
    console.log(filter);
    if (filter?.name) {
      filter['name'] = { [Op.substring]: filter.name };
    }
    const { count, rows } = await this.repository.findAndCountAll({
      where: { ...filter },
      ...pagination,
    });
    const data = {
      count: count,
      data: rows,
    };
    return data;
  }

  async create(dto: CustomerDTO) {
    const customer = await this.repository.create(dto);
    return customer.get();
  }

  async edit(id: number, dto: CustomerDTO) {
    const customer = await this.repository.findByPk(id);
    if (!customer) return null;
    customer.update(dto);
    customer.save();
    return customer.get();
  }

  async delete(id: number) {
    const customer = await this.repository.findByPk(id);
    if (!customer) return null;
    await customer.destroy();
    return true;
  }

  async detail(id: number) {
    const customer = await this.repository.findOne({ where: { user_id: id } });
    if (!customer) return null;
    return customer.get();
  }

  // async create()
}
