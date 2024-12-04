import { PEMISSION_ROLE_REPOSITORY, USER_REPOSITORY } from "src/constants/repository_enum";
import { User } from "./entities/user.entity";
import { PermissionRole } from "./entities/permission_role.entity";

export const authProviders = [{ provide: USER_REPOSITORY, useValue: User }, { provide: PEMISSION_ROLE_REPOSITORY, useValue: PermissionRole }];
