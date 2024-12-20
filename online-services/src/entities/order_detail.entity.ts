
import { AutoIncrement, Table, Model, PrimaryKey, Column, DataType, Unique, BelongsTo, ForeignKey } from "sequelize-typescript";import { Order } from "./order.entity";
;

@Table({tableName: "order_detail"})
export class OrderDetail extends Model<OrderDetail> {
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
        type: DataType.BIGINT,
        allowNull: false,
      })
    id_product: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
      })
    quanity: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
      })
    price: number;

}