import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import RegisterInfo from "./dto/register-info";
import InfoChangePassword from "./dto/info-change-password.dto";
import RoleDTO from "./dto/rol-dto";
import { da } from "date-fns/locale";
import { Permissions } from "src/decorator/permission.decorator";
import { PermissionGuard } from "src/guards/check-permission.guard";
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
}
