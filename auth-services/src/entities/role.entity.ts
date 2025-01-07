import { AllowNull, AutoIncrement, Column, DataType, Default, IsEmail, PrimaryKey, Table, Unique, Model, HasMany } from "sequelize-typescript";
import { User } from "./user.entity";
import { PermissionRole } from "./permission_role.entity";

@Table({ tableName: "role" })
export class Role extends Model<Role> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(10),
  })
  id: string;

  @Unique
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => User)
  employees: User[];

  @HasMany(() => PermissionRole)
  permissions: PermissionRole[];
}
