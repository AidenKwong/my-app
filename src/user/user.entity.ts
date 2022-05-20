import { Exclude } from "class-transformer";
import { isPhoneNumber } from "class-validator";
import { Task } from "src/task/task.entity";
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Unique(["email"])
  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { nullable: true })
  gender: string;

  @Column("int", { nullable: true })
  age: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
