import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';
import { OrderDetailDto } from './order-detail.dto';

export class OrderCreateDTO {
  @IsNotEmpty()
  id_customer: number;

  total_price: number;

  @IsNotEmpty()
  address: string;

  status: number;

  order_details: OrderDetailDto[];
}
