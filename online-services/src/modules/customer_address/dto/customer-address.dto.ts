import { IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";

export class CustomerAddressDTO {

    @IsNotEmpty()
    id_customer: number;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone_number: string;

    is_default: number;
  }
  