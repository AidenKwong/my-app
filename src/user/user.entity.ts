import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  IsNull,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("varchar")
  firstName: string;

  @Column("varchar")
  lastName: string;

  @Unique(["email"])
  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;
}
