import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import User from "./User";
import Permissions from "./Permissions";

@Entity()
export default class Groups {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => User, (user) => user.group)
  user: User[];

  @ManyToMany((type) => Permissions, (permission) => permission.group, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: "groups_permissions",
    joinColumn: {
      name: "group_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "id",
    },
  })
  permission: Permissions[];
}
