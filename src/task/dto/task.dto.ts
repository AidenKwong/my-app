import { Optional } from "@nestjs/common";
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";
import { User } from "src/user/user.entity";

export class Task {
  @IsNotEmpty()
  @IsString()
  title: string;

  @Optional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;
}
