
import { AutoIncrement, Table, Model, PrimaryKey, Column, DataType, Unique, BelongsTo, ForeignKey, Default, IsEmail } from "sequelize-typescript";import { Customer } from "./customer.entity";
;

@Table({tableName: "customer_address"})
export class CustomerAddress extends Model<CustomerAddress> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.BIGINT,
    })
    id: number;
  
    @ForeignKey(() => Customer)
    @Column({
      type: DataType.BIGINT,
      allowNull: false,
    })
    id_customer: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
      })
    address: string;

    @Column({
      type: DataType.TEXT,
      allowNull: false,
    })
    phone_number: string;

    @Default(0)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
    is_default: number;


}