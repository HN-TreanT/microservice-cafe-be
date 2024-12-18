
import { IsNotEmpty, IsEmail, IsEmpty } from "class-validator";

export default class PermissionRoleDTO {

  @IsNotEmpty()
  id_role: string;

  permissions: string[];
}
