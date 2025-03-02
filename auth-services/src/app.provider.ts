import { PEMISSION_ROLE_REPOSITORY, PERMISSION_REPOSITORY, ROLE_REPOSITORY, USER_REPOSITORY } from "src/constants/repository_enum";
import { User } from "./entities/user.entity";
import { PermissionRole } from "./entities/permission_role.entity";
import { Role } from "./entities/role.entity";
import { Permission } from "./entities/permission.entity";

export const authProviders = [{ provide: USER_REPOSITORY, useValue: User }, 
    { provide: PEMISSION_ROLE_REPOSITORY, useValue: PermissionRole }, 
    { provide: ROLE_REPOSITORY, useValue: Role }, 
    {provide: PERMISSION_REPOSITORY, useValue: Permission}];
