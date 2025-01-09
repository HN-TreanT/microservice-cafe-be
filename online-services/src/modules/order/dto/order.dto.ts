import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  id_customer: number;

  @IsNotEmpty()
  address: number;

  total_price: number;

  status: number;
}
