import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Groups from "./Groups";

@Entity()
export default class Permissions {
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

  @ManyToMany((type) => Groups, (group) => group.permission)
  @JoinTable({
    name: "groups_permissions",
    joinColumn: {
      name: "permission_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "group_id",
      referencedColumnName: "id",
    },
  })
  group: Groups[];
}
