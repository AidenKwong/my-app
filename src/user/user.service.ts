import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDto } from "src/auth/dto/sign-up.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: SignUpDto) {
    const hash = await argon2.hash(dto.password);
    dto.password = hash;
    const user = this.usersRepository.create(dto);
    const userAdded = await this.usersRepository.save(user);
    delete userAdded.password;
    delete userAdded.id;
    return { userAdded };
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(email: string) {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }
}
