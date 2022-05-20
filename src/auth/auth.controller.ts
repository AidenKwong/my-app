import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  ping() {
    return "auth route";
  }

  @Post("/signup")
  async signUp(@Body() dto: SignUpDto) {
    const user = await this.authService.create(dto);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post("/signin")
  async signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
