import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth-services',
            // brokers: ['kafka:9092'],
            brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
          },
          consumer: {
            groupId: 'auth-services-consumer',
          },
        }
      }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [ClientsModule]
})
export class AuthModule {}
