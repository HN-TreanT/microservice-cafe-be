import * as dotenv from "dotenv";

import { IDatabaseConfig } from "./interfaces/dbConfig.interface";

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
   development: {
    username: "root",
    password: "hnam23012002",
    database: "online_service",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      // useUTC: false, // for reading from database
      dateStrings: true,
      typeCast(field: any, next: any) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,

    dialectOptions: {
      // useUTC: false, // for reading from database
      dateStrings: true,
      typeCast(field: any, next: any) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: "mysql",

    dialectOptions: {
      // useUTC: false, // for reading from database
      dateStrings: true,
      typeCast(field: any, next: any) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
  },
};
