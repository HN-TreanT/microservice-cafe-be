import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from './logger/logger.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerAddressModule } from './modules/customer_address/customer_address.module';
import { OrderDetailModule } from './modules/oder_detail/order_detail.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ShipmentOnlineModule } from './modules/shipment_online/shipment_online.module';
import { ShipperModule } from './modules/shipper/shipper.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "OFFLINE_SERVICES",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'offline-services',
            // brokers: ['kafka:9092'],
            brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
          },
          consumer: {
            groupId: 'offline-services-consumer1',
          },
        }
      }
    ]),
    DatabaseModule, LoggerModule, CustomerModule, CustomerAddressModule, OrderDetailModule, OrderModule, PaymentModule, ShipmentOnlineModule, ShipperModule ],
  controllers: [AppController],
  exports: [ClientsModule],
  providers: [
    AppService, 
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    }
  ],
})
export class AppModule {}
