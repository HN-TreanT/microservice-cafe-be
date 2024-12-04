import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClientKafka } from "@nestjs/microservices";
import { PERMISSION_KEY } from "src/decorator/permission.decorator";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }
    const token = authorizationHeader.split(' ')[1];
    console.log(token)
    const permission = this.reflector.getAllAndOverride<String>(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    const response = await this.authClient.send("checkPermission", {token: token, permission: permission}).toPromise();
    console.log(response)
    if (response["status"] === 401) {
        throw new UnauthorizedException(response["message"])
    }

    if (response["status"]  === 403) {
        throw new ForbiddenException(response["message"])
    }

    if (response["status"]  === 200){
        return true
    }
    return false;
  }
}
