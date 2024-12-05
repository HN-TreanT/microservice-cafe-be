
import { AutoIncrement, Table, Model, PrimaryKey, Column, DataType, Unique, BelongsTo, ForeignKey, Default, IsEmail, HasMany } from "sequelize-typescript";import { CustomerAddress } from "./customer_address.entity";
import { Order } from "./order.entity";
;

@Table({tableName: "customer"})
export class Customer extends Model<Customer> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.BIGINT,
    })
    id: number;
  
    @Column({
      type: DataType.TEXT,
      allowNull: false,
    })
    name: string;
    
    @Default(1)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
    gender: number;

    @IsEmail
    @Column({
        type: DataType.TEXT,
        allowNull: true,
      })
    email: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
      })
    phone_number: string;

    @Column({
      type: DataType.BIGINT,
      allowNull: true,
    })
    user_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
      })
    point: number;

    @HasMany(() => CustomerAddress)
    customer_address: CustomerAddress[]

    @HasMany(() => Order)
    orders : Order[]

}