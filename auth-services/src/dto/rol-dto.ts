
import { IsNotEmpty, IsEmail, IsEmpty } from "class-validator";

export default class RoleDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}
