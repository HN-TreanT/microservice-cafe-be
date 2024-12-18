import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import RegisterInfo from "./dto/register-info";
import InfoChangePassword from "./dto/info-change-password.dto";
import RoleDTO from "./dto/rol-dto";
import { da } from "date-fns/locale";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";
import PermissionRoleDTO from "./dto/permission-role.dto";
import { Op } from "sequelize";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() registerInfo: RegisterInfo) {
    return this.authService.register(registerInfo);
  }

  @Post("/login")
  async signIn(@Body() payload: any) {
    const {username, password}  = payload
    return this.authService.signIn(username, password);
  }

  @Post("/change-password")
  async changePassword(@Body() data: InfoChangePassword) {
    return this.authService.changePassword(data);
  }

  @Post("/refresh")
  async refresh(@Body() payload: any) {
    return this.authService.refresh(payload);
  }

  @Permissions("view_role")
  @UseGuards(PermissionGuard)
  @Get("/role")
  async listRole() {
    return this.authService.listRole();
  }

  @Permissions("create_role")
  @UseGuards(PermissionGuard)
  @Post("/role")
  async createRole(@Body() data: RoleDTO) {
    return this.authService.createRole(data);
  }

  @Permissions("edit_role")
  @UseGuards(PermissionGuard)
  @Put("/role")
  async editRole(@Body() data: RoleDTO) {
    return this.authService.editRole(data);
  }

  @Permissions("delete_role")
  @UseGuards(PermissionGuard)
  @Delete("/role/:id")
  async deleteRole(@Param("id") id: string) {
    return this.authService.deleteRole(id);
  }
  // @Get("/forget-password/:email")
  // async forgetPassword(@Param("email") email: string) {
  //   return this.authService.forgetPassowrd(email);
  // }

  @Permissions("view_permissions")
  @UseGuards(PermissionGuard)
  @Get("/permissions")
  async getAllPermissions() {
    return this.authService.getAllPermissions();
  }

  // @Permissions("view_permission_role")
  // @UseGuards(PermissionGuard)
  @Get("/permission_role/:id")
  async getAllPermissionRoles(@Param("id") id: string) {
    return this.authService.getAllPermissionRoles(id)
  }

  @Permissions("edit_permission_role")
  @UseGuards(PermissionGuard)
  @Post("/permission_role/edit")
  async editPermissionRole(@Body() dto : PermissionRoleDTO) {
    const data = this.authService.editPermisionRoles(dto)
    if (!data) {
        throw new NotFoundException('permissions length > 0');
    }
    return this.authService.editPermisionRoles(dto)
  }

  @Permissions("view_user")
  @UseGuards(PermissionGuard)
  @Get("/list-user")
  async get(@Req() req: any, @Query("name") name: string) {
    const pagination = req.pagination;
    let filter = {};
    if (name) {
      filter["name"] = { [Op.substring]: name };
    }
    const data = await this.authService.getUser(pagination, filter);
    return data;
  }

  @Permissions("edit_user")
  @UseGuards(PermissionGuard)
  @Post("/edit-user")
  async editSuer(@Body() registerInfo: RegisterInfo) {
    return this.authService.editUser(registerInfo);
  }

  @Permissions("delete_user")
  @UseGuards(PermissionGuard)
  @Delete("/delete-user/:id")
  async deleteU(@Param("id") id: string) {
    return this.authService.deleteUser(id);
  }
  

}
