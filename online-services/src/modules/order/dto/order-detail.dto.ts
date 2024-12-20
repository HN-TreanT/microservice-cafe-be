import { IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";

export class OrderDetailDto {

    id_order: number;

    @IsNotEmpty()
    id_product: number;

    @IsNotEmpty()
    quanity: number

    @IsNotEmpty()
    price: number

  }
  