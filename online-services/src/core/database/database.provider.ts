import { Sequelize } from "sequelize-typescript";

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from "../constants";
import { databaseConfig } from "./database.config";
import { CustomerAddress } from "src/entities/customer_address.entity";
import { Customer } from "src/entities/customer.entity";
import { OrderDetail } from "src/entities/order_detail.entity";
import { Order } from "src/entities/order.entity";
import { Payment } from "src/entities/payment.entity";
import { ShipmentOnline } from "src/entities/shipment_online.entity";


export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config = databaseConfig[process.env.NODE_ENV || DEVELOPMENT];
      console.log(config)
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
         CustomerAddress, Customer, OrderDetail, Order, Payment, ShipmentOnline
      ]);
      // await sequelize.sync({force: true});
      return sequelize;
    },
  },
];
