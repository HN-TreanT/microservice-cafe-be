import { IsNotEmpty } from "class-validator";

export class ShipperDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    user_id: number;
}
