import { IsEmail, IsNotEmpty } from "class-validator";

export class CustomerCreateDTO {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    id_role: string;

    @IsNotEmpty()
    name: string;

    gender: number;
  
    @IsEmail()
    email: string;
    phone_number: string

    user_id: number;
    point: number;

  }
  