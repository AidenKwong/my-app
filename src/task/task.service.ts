import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskInsertion } from "src/interfaces/taskInsertion";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private userService: UserService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(task: TaskInsertion) {
    const user = await this.userService.findOneById(task.userId);

    const taskCreated = this.taskRepository.create({ user, ...task });

    return this.taskRepository.save(taskCreated);
  }
}
