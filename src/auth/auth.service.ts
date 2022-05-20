import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { SignUpDto } from "./dto/sign-up.dto";
import * as argon2 from "argon2";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(dto: SignUpDto) {
    const hash = await argon2.hash(dto.password);
    dto.password = hash;
    return await this.userService.create(dto);
  }

  async validateUser(dto: SignInDto) {
    const { email, password } = dto;
    const user = await this.userService.findOne(email);
    if (!user) {
      return { result: false, message: "User not found" };
    }
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return { result: false, message: "Invalid password" };
    }
    if (user && isValid) {
      delete user.password;
      return user;
    }
  }

  async signin(dto: SignInDto) {
    const user = await this.userService.findOne(dto.email);
    const { email, id } = user;
    const payload = { email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
