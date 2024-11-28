import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CategoryModule } from "./category/category.module";


@Module({
    imports:[
        ClientsModule.register([
            {
              name: "OFFLINE_SERVICES",
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'offline-services',
                  brokers: ['kafka:9092'],
                },
                consumer: {
                  groupId: 'offline-services-consumer',
                },
              }
            }
          ]),
        CategoryModule],
    controllers: [],
    providers: [],
    exports: [ClientsModule]
})

export class OfflineServiceModule{};