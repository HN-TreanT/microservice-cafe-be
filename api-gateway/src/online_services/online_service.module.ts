import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { OnlineServiceServices } from "./online_service.service";
import { CustomerModule } from "./customer/customer.module";
import { AuthModule } from "src/auth_services/auth.module";
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { ShipperModule } from './shipper/shipper.module';
import { OrderModule } from './order/order.module';

@Module({
    imports:[
        ClientsModule.register([
            {
              name: "ONLINE_SERVICES",
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'online-services',
                  // brokers: ['kafka:9092'],
                  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
                },
                consumer: {
                  groupId: 'online-services-consumer',
                },
              }
            }
          ]), CustomerModule, AuthModule, CustomerAddressModule, ShipperModule, ShipperModule, OrderModule],
    controllers: [],
    providers: [OnlineServiceServices],
    exports: [ClientsModule]
})

export class OnlineServiceModule{};