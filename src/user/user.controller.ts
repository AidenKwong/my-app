import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async findOne(@Request() req: any) {
    const { password, ...profile } = await this.userService.findOneByEmail(
      req.user.email,
    );
    return profile;
  }
}
