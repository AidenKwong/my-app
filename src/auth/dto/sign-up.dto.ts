import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @Optional()
  @IsString()
  gender: string;

  @Optional()
  @Type(() => Number)
  @IsNumber()
  age: number;
}
