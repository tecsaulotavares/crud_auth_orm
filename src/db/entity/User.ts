import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import Groups from "./Groups";
import { hashSync } from "bcryptjs";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  e_mail: string;

  @Column()
  password: string;

  @Column()
  birth: Date;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne((type) => Groups, (group) => group.user, { eager: true })
  group: Groups;

  @BeforeInsert()
  @BeforeUpdate()
  private cryptoPassword() {
    if (this.password) {
      this.password = hashSync(this.password);
    }
  }
}
