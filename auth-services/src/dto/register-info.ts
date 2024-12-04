
import { IsNotEmpty, IsEmail, IsEmpty } from "class-validator";

export default class RegisterInfo {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  id_role: string;
}
