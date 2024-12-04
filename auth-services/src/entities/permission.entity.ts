import { Column, DataType, Default, IsEmail, PrimaryKey, Table, Unique, Model, HasMany } from "sequelize-typescript";
import { PermissionRole } from "./permission_role.entity";

@Table({ tableName: "permission" })
export class Permission extends Model<Permission> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(200),
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => PermissionRole)
  permissions: PermissionRole[];
}
