
import { AutoIncrement, Table, Model, PrimaryKey, Column, DataType, Unique, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Role } from "./role.entity";

@Table({tableName: "user"})

export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.BIGINT,
    })
    id: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name: string;

    @Unique
    @Column({
      type: DataType.STRING(30),
      allowNull: false,
    })
    username: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password: string;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    refresh_token: string

    @ForeignKey(() => Role)
    @Column({ type: DataType.STRING(10), allowNull: false })
    id_role: string;

    @BelongsTo(() => Role)
    role: Role;

}