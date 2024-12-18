import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PEMISSION_ROLE_REPOSITORY, PERMISSION_REPOSITORY, ROLE_REPOSITORY, USER_REPOSITORY } from './constants/repository_enum';
import { User } from './entities/user.entity';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import RegisterInfo from './dto/register-info';
import { jwtContants } from './constants/jwtConstant';
import InfoChangePassword from './dto/info-change-password.dto';
import { PermissionRole } from './entities/permission_role.entity';
import { Role } from './entities/role.entity';
import RoleDTO from './dto/rol-dto';
import { Permission } from './entities/permission.entity';
import { Op, Sequelize } from "sequelize";
import PermissionRoleDTO from './dto/permission-role.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly authRepository: typeof User,
    @Inject(PEMISSION_ROLE_REPOSITORY) private readonly permisionRoleReposity: typeof PermissionRole,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role,
    @Inject(PERMISSION_REPOSITORY) private readonly permissionRepository: typeof Permission,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.authRepository.findOne({ where: { username: username } });
    if (!user) throw new NotFoundException({ status: false, message: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException({ status: false, message: "password inccorect" });
    if (user && isMatch) return user;
    return null;
  }

  async register(registerInfo: RegisterInfo) {
    console.log(registerInfo.password)
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(registerInfo.password, salt);
     console.log(hashPassword)
     registerInfo.password = hashPassword;
     const user = await this.authRepository.create(registerInfo);
     return user.get();
   }

   async signIn(username: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await this.authRepository.findOne({where : {username: username}})
    const check = bcrypt.compare(hashPassword, user.password);
    if (!check) {
      console.log("login fail")
      return null
    }
    const payload = {
      username: username, 
      id_role: user.id_role
    }
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: jwtContants.refreshToken_secret,
      expiresIn: "300d",
    });
    user.refresh_token = refresh_token;
    await user.save();

    //get permission
    const permisionRole = await this.permisionRoleReposity.findAll({where: {id_role: user.id_role}})
    const permissions: string[] = permisionRole.map((item) => item.id_permistion )

    return { ...user.dataValues, access_token, permissions: permissions };

  }

  async changePassword(info: InfoChangePassword) {
    const user = await this.validateUser(info.username, info.old_password);
    const hashNewPassword = await bcrypt.hash(info.new_password, 10);
    user.password = hashNewPassword;
    return await user.save();
  }

  async refresh(payload: any) {
    try {
      const {refresh_token} = payload;
      if (!refresh_token) {
        return {
          status: 401,
          message: "refresh token invalid",
        }
      }
      const verify_refresh_token = await this.jwtService.verifyAsync(refresh_token, {
        secret: jwtContants.refreshToken_secret
      })
      if (!verify_refresh_token) {
        return {
          status: 401,
          message: "Token invalid or expired",
         }
      }
      const payload_access = {
        username: verify_refresh_token["username"],
        id_role: verify_refresh_token["id_role"]
      }
      const access_token = await this.jwtService.signAsync(payload_access);
      return {
        status: 200,
        message: "success",
        access_token: access_token
      };
    } catch (err) {
      console.log(err)
      return {
        status: 401,
        message: "Token invalid or expired",
       }
    }
  }

  async checkPermissions(token: string, permission: string) {
   try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtContants.secret
      })
      const id_role = payload["id_role"]

      if (id_role === "A") {
        return {
          status: 200,
          message: "access"
        }
      }
      const permisionRole = await this.permisionRoleReposity.findAll({where: {id_role: id_role}})
      const permissions: string[] = permisionRole.map((item) => item.id_permistion )
      if (permissions.includes(permission)) {
        return {
          status: 200,
          message: "access"
        }
      }

      return {
        status: 403,
        message: "for bidden"
      }


   } catch (err) {
     return {
      status: 401,
      message: "Token invalid or expired",
     }
   }

  }

  async listRole() {
     const list = await this.roleRepository.findAll()
     return list
  }

  async createRole(dto : RoleDTO) {
    const role = await this.roleRepository.create(dto);
    return role.get()
  }

  async deleteRole(id : string) {
    await this.roleRepository.destroy({ where: { id: id } });
    return true;
  }

  async editRole(dto : RoleDTO) {
     const role = await this.roleRepository.findByPk(dto.id);
     if (!role) throw new NotFoundException({ message: "not found role", status: false });
     await role.update(dto);
     return role.get();
  }
  
  async getAllPermission() {
      const permissions = await this.permissionRepository.findAll();
      const groupedPermissions = permissions.reduce((acc, permission) => {
        const type = permission.type; 
        if (!acc[type]) {
            acc[type] = []; 
        }
        acc[type].push(permission); 
        return acc;
      }, {});
       return groupedPermissions
  }

  async getAllPermisionRole(id : string) {
    const permisionRole = await this.permisionRoleReposity.findAll({where: {id_role: id}})
    const permissions: string[] = permisionRole.map((item) => item.id_permistion )
    return permissions
  }

  async editPermisionRole(dto : PermissionRoleDTO) {
     if (dto.permissions.length < 0) {
       return false
     }
     await this.permisionRoleReposity.destroy({where: {id_role: dto.id_role}})
     const rolePermission = dto.permissions.map((item) => {
      return {
        id_role: dto.id_role,
        id_permistion: item
      }
     })
     await this.permisionRoleReposity.bulkCreate(rolePermission)  
     return true
  }

  async getUser(pagination: any, filter: any) {
    const { count, rows } = await this.authRepository.findAndCountAll({
      attributes: {
        exclude: ["password"],
      },
      where: { ...filter },
      ...pagination,
      include: [
        {
          model: Role
        }
      ]
    });

    return {
      count: count, 
      data: rows
    }

  }

  async editUser(dto: RegisterInfo) {
    const user = await this.authRepository.findOne({where: {username: dto.username}})
    if (user == null) {
      return null
    }
    user.id_role = dto.id_role
    user.name = dto.name
    user.save()
    return user.get()
  }

  async deleteUser(id: any) {
    const user = await this.authRepository.findByPk(id)
    if (!user) {
      return false
    }
    await user.destroy()
    return true

  }
}


