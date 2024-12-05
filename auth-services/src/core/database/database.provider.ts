import { Sequelize } from "sequelize-typescript";

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from "../constants";
import { databaseConfig } from "./database.config";
import { User } from "src/entities/user.entity";
import { Role } from "src/entities/role.entity";
import { Permission } from "src/entities/permission.entity";
import { PermissionRole } from "src/entities/permission_role.entity";

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
        User, Permission, PermissionRole, Role
      ]);
      // await sequelize.sync({force: true});
      return sequelize;
    },
  },
];
