import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ExpressRequestWithUser } from "src/interfaces/ExpressRequestWithUser";
import { Task } from "./dto/task.dto";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Request() req: ExpressRequestWithUser, @Body() dto: Task) {
    const userId = req.user.id;

    const task = { userId: userId, ...dto };

    return await this.taskService.create(task);
  }
}
