import {
  AutoIncrement,
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  Unique,
  BelongsTo,
  ForeignKey,
  Default,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Customer } from './customer.entity';
import { OrderDetail } from './order_detail.entity';
import { ShipmentOnline } from './shipment_online.entity';
import { Payment } from './payment.entity';
@Table({ tableName: 'order' })
export class Order extends Model<Order> {
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
    type: DataType.FLOAT,
    allowNull: true,
  })
  total_price: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number;

  // @HasOne(() => Customer)
  // customer: Customer

  @HasMany(() => OrderDetail)
  order_details: OrderDetail[];

  @HasMany(() => ShipmentOnline)
  shipment_onlines: ShipmentOnline[];

  @HasMany(() => Payment)
  payments: Payment[];

  @BelongsTo(() => Customer)
  customer: Customer;
}
