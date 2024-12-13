import { IsEmail, IsNotEmpty } from "class-validator";

export class CustomerDTO {

    @IsNotEmpty()
    name: string;

    gender: number;
  
    @IsEmail()
    email: string;
    phone_number: string

    @IsNotEmpty()
    user_id: number;
    point: number;
  }
  