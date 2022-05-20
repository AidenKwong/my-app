import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";
import { ConfigModule } from "@nestjs/config";
import ormconfig from "../ormconfig";
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".development.env" }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "my_app",
      entities: ["dist/**/*entity.js"],
      migrations: ["dist/migrations/*.js"],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
