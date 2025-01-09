import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_ADDRESS_REPOSITORY,
  CUSTOMER_REPOSITORY,
} from 'src/constants/repository_enum';
import { CustomerAddress } from 'src/entities/customer_address.entity';
import { CustomerAddressDTO } from './dto/customer-address.dto';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomerAddressService {
  @Inject(CUSTOMER_ADDRESS_REPOSITORY)
  private readonly repository: typeof CustomerAddress;
  @Inject(CUSTOMER_REPOSITORY)
  private readonly customerRepository: typeof Customer;

  async get(pagination: any, filter: any): Promise<any> {
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

  async create(dto: CustomerAddressDTO) {
    const customer = await this.customerRepository.findByPk(dto.id_customer);
    if (!customer) return null;
    const count_customer_address = await this.repository.count({
      where: { id_customer: dto.id_customer },
    });
    if (count_customer_address === 0) {
      dto.is_default = 1;
    } else {
      dto.is_default = 0;
    }
    const customerAddress = await this.repository.create(dto);
    return customerAddress.get();
  }

  async edit(id: number, dto: CustomerAddressDTO) {
    const customerAddress = await this.repository.findByPk(id);
    if (!customerAddress) return null;
    customerAddress.update(dto);
    customerAddress.save();
    return customerAddress.get();
  }

  async deleteById(id: number) {
    const customerAddress = await this.repository.findByPk(id);
    if (!customerAddress) return null;
    await customerAddress.destroy();
    return true;
  }
}
