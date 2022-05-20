import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TaskModule } from './task/task.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
