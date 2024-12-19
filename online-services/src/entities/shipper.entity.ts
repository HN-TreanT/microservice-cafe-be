
import { AutoIncrement, Table, Model, PrimaryKey, Column, DataType, Unique, BelongsTo, ForeignKey, Default, IsEmail, HasMany } from "sequelize-typescript";
import { ShipmentOnline } from "./shipment_online.entity";

@Table({tableName: "shipper"})
export class Shipper extends Model<Shipper> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.BIGINT,
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
      })
    name: string;

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

    @HasMany(() => ShipmentOnline)
    shipment_onlines: ShipmentOnline[]

}