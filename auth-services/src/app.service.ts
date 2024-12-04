import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PEMISSION_ROLE_REPOSITORY, USER_REPOSITORY } from './constants/repository_enum';
import { User } from './entities/user.entity';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import RegisterInfo from './dto/register-info';
import { jwtContants } from './constants/jwtConstant';
import InfoChangePassword from './dto/info-change-password.dto';
import { PermissionRole } from './entities/permission_role.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly authRepository: typeof User,
    @Inject(PEMISSION_ROLE_REPOSITORY) private readonly permisionRoleReposity: typeof PermissionRole,
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
    return { ...user.dataValues, access_token };

  }

  async changePassword(info: InfoChangePassword) {
    const user = await this.validateUser(info.username, info.old_password);
    const hashNewPassword = await bcrypt.hash(info.new_password, 10);
    user.password = hashNewPassword;
    return await user.save();
  }

  async refresh(payload: any) {
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async checkPermissions(token: string, permission: string) {
   try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtContants.secret
      })
      const id_role = payload["id_role"]

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

}


