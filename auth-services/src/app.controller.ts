import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import RegisterInfo from './dto/register-info';
import InfoChangePassword from './dto/info-change-password.dto';
import RoleDTO from './dto/rol-dto';
import PermissionRoleDTO from './dto/permission-role.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @MessagePattern("register")
  async register(@Payload() registerInfo: RegisterInfo) {
    return this.appService.register(registerInfo);
  }
  
  @MessagePattern("singIn")
  async signIn(@Payload() payload: any) {
    const {username, password} = payload;
    return this.appService.signIn(username, password);
  }

  @MessagePattern("change-password")
  async changePassword(@Payload() data: InfoChangePassword) {
    return this.appService.changePassword(data);
  }

  @MessagePattern("refresh")
  async refresh(@Payload() payload: any) {
    return this.appService.refresh(payload);
  }

  @MessagePattern("checkPermission")
  async checkPermission(@Payload() payload: any) {
    const {token, permission} = payload;
    return this.appService.checkPermissions(token, permission);
  }

  @MessagePattern("list-role")
  async listRole() {
    return this.appService.listRole();
  }

  @MessagePattern("create-role")
  async createRole(@Payload() dto : RoleDTO) {
    return this.appService.createRole(dto);
  }
  @MessagePattern("edit-role")
  async editRole(@Payload() dto : RoleDTO) {
    return this.appService.editRole(dto);
  }

  @MessagePattern("delete-role")
  async deleteRole(@Payload("id") id : string) {
    return this.appService.deleteRole(id);
  }

  @MessagePattern("list-permissions")
  async listPermissions() {
    return this.appService.getAllPermission()
  }

  @MessagePattern("list-permissions-role")
  async getAllPermissionRole(@Payload("id") id : string) {
    return this.appService.getAllPermisionRole(id);
  }

  @MessagePattern("edit-permissions-role")
  async editPermissionRole(@Payload() dto : PermissionRoleDTO) {
    return this.appService.editPermisionRole(dto);
  }

  @MessagePattern("list-user")
  async getUser(@Payload() payload: any) {
    const {pagination, filter} = payload
    return this.appService.getUser(pagination, filter)
  }

  @MessagePattern("edit-user")
  async editUser(@Payload() registerInfo: RegisterInfo) {
    return this.appService.editUser(registerInfo)
  }

  @MessagePattern("delete-user")
  async deleteUser(@Payload("id") id : any) {
    return this.appService.deleteUser(id)
  }
}
