import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import RegisterInfo from './dto/register-info';
import { JwtService } from '@nestjs/jwt';
import InfoChangePassword from './dto/info-change-password.dto';
import { ClientKafka } from '@nestjs/microservices';
import RoleDTO from './dto/rol-dto';
import PermissionRoleDTO from './dto/permission-role.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('register');
    this.authClient.subscribeToResponseOf('singIn');
    this.authClient.subscribeToResponseOf('change-password');
    this.authClient.subscribeToResponseOf('refresh');
    this.authClient.subscribeToResponseOf('checkPermission');
    this.authClient.subscribeToResponseOf('list-role');
    this.authClient.subscribeToResponseOf('create-role');
    this.authClient.subscribeToResponseOf('edit-role');
    this.authClient.subscribeToResponseOf('delete-role');
    this.authClient.subscribeToResponseOf('list-permissions');
    this.authClient.subscribeToResponseOf('list-permissions-role');
    this.authClient.subscribeToResponseOf('edit-permissions-role');
    this.authClient.subscribeToResponseOf('list-user');
    this.authClient.subscribeToResponseOf('edit-user');
    this.authClient.subscribeToResponseOf('delete-user');
    this.authClient.subscribeToResponseOf('check-user');

    this.authClient.connect();
  }

  async register(registerInfo: RegisterInfo) {
    const data = await this.authClient
      .send('register', JSON.stringify(registerInfo))
      .toPromise();
    return data;
  }

  async signIn(username: string, password: string) {
    const data = await this.authClient
      .send('singIn', { username: username, password: password })
      .toPromise();
    return data;
  }

  async changePassword(info: InfoChangePassword) {
    const data = await this.authClient
      .send('change-password', { info })
      .toPromise();
    return data;
  }

  async refresh(payload: any) {
    const data = await this.authClient.send('refresh', payload).toPromise();
    const status = data['status'];
    if (status === 401) {
      throw new UnauthorizedException({
        message: 'Invalid or expired refresh token',
        status: 401,
      });
    }
    return data['access_token'];
  }

  async listRole() {
    const data = await this.authClient.send('list-role', {}).toPromise();
    return data;
  }

  async createRole(dto: RoleDTO) {
    const data = await this.authClient
      .send('create-role', JSON.stringify(dto))
      .toPromise();
    return data;
  }

  async deleteRole(id: string) {
    const data = await this.authClient.send('delete-role', { id }).toPromise();
    return data;
  }

  async editRole(dto: RoleDTO) {
    const data = await this.authClient
      .send('edit-role', JSON.stringify(dto))
      .toPromise();
    return data;
  }

  async getAllPermissions() {
    const data = await this.authClient.send('list-permissions', {}).toPromise();
    return data;
  }

  async getAllPermissionRoles(id: string) {
    const data = await this.authClient
      .send('list-permissions-role', { id })
      .toPromise();
    return data;
  }

  async editPermisionRoles(dto: PermissionRoleDTO) {
    const data = await this.authClient
      .send('edit-permissions-role', JSON.stringify(dto))
      .toPromise();
    return data;
  }

  async editUser(registerInfo: RegisterInfo) {
    const data = await this.authClient
      .send('edit-user', JSON.stringify(registerInfo))
      .toPromise();
    return data;
  }

  async getUser(pagination: any, filter: any) {
    const data = await this.authClient
      .send('list-user', { pagination, filter })
      .toPromise();
    return data;
  }

  async deleteUser(id: any) {
    const data = await this.authClient.send('delete-user', { id }).toPromise();
    if (data) {
      return data;
    } else {
      throw new NotFoundException('User not found');
    }
  }
  async checkUser(id: any) {
    const data = await this.authClient.send('check-user', { id }).toPromise();
    if (data) {
      return data;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
