
import { AutoIncrement, Table, Model, PrimaryKey, Column, DataType, Unique, BelongsTo, ForeignKey, Default, IsEmail } from "sequelize-typescript";import { Order } from "./order.entity";
;

@Table({tableName: "payment"})
export class Payment extends Model<Payment> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.BIGINT,
    })
    id: number;
  
    @ForeignKey(() => Order)
    @Column({
      type: DataType.BIGINT,
      allowNull: false,
    })
    id_order: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
      })
    payment_method: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
      })
    transaction_id: string;

    @Column({
        type: DataType.TIME,
        allowNull: false,
      })
    payment_time: Date;

    @Default(0)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      transaction_status: number;


}