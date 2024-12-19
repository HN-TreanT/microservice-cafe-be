import { IsEmail, IsNotEmpty } from "class-validator";

export class ShipperCreateDTO {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    id_role: string;

    @IsNotEmpty()
    name: string;


    @IsNotEmpty()
    phone_number: string;

    user_id: number;

  }
  