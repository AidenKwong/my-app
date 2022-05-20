import { IsNotEmpty } from "class-validator";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column("varchar")
  title: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column("varchar")
  status: string;

  @Column({
    type: "timestamp",
  })
  dueDate: Date;

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
  newTask: Promise<User>;
}
