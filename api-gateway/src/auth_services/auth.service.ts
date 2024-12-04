import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import RegisterInfo from "./dto/register-info";
import { JwtService } from "@nestjs/jwt";
import InfoChangePassword from "./dto/info-change-password.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('register');
    this.authClient.subscribeToResponseOf('singIn');
    this.authClient.subscribeToResponseOf('change-password');
    this.authClient.subscribeToResponseOf('refresh');
    this.authClient.subscribeToResponseOf('checkPermission');
    this.authClient.connect();
  }

  async register(registerInfo: RegisterInfo) {
    const data = await this.authClient.send('register', JSON.stringify(registerInfo)).toPromise();
    return data;
  }

  async signIn(username: string, password: string) {
    const data = await this.authClient.send('singIn', { username: username, password: password }).toPromise();
    return data;
  }

  async changePassword(info: InfoChangePassword) {
    const data = await this.authClient.send('change-password', { info }).toPromise();
    return data;
  }

  async refresh(payload: any){
    const data = await this.authClient.send('refresh', { req: payload }).toPromise();
    return data;
  }
}
