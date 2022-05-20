import { ForbiddenException, Injectable } from "@nestjs/common";
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
    try {
      const user = this.usersRepository.create(dto);
      const { password, id, ...userAdded } = await this.usersRepository.save(
        user,
      );

      return { userAdded };
    } catch (error) {
      if (error.code == "ER_DUP_ENTRY") {
        throw new ForbiddenException("User already exists");
      }
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOne({ id });
    return user;
  }
}
