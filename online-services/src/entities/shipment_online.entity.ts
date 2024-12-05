
import { AutoIncrement, Table, Model, PrimaryKey, Column, DataType, Unique, BelongsTo, ForeignKey, Default, IsEmail } from "sequelize-typescript";import { Order } from "./order.entity";
;

@Table({tableName: "shipment_online"})
export class ShipmentOnline extends Model<ShipmentOnline> {
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
    shipping_address: string;

    @Column({
      type: DataType.FLOAT,
      allowNull: false,
    })
    shipping_fee: number;

    @Column({
        type: DataType.TIME,
        allowNull: false,
      })
    estimated_delivery_time: Date;

    @Default(0)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
    delivery_status: number;


}