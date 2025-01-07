import { Column, DataType, Default, IsEmail, PrimaryKey, Table, Unique, Model, HasMany, AutoIncrement, ForeignKey } from "sequelize-typescript";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Table({ tableName: "permission_role" })
export class PermissionRole extends Model<PermissionRole> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
    })
    id: number;

    @ForeignKey(() => Permission)
    @Column({ type: DataType.STRING(200), allowNull: false })
    id_permistion: string;

    @ForeignKey(() => Role)
    @Column({ type: DataType.STRING(10), allowNull: false })
    id_role: string;
}
