import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./users.entity";
import {UsersRepository} from "./users.repository";
import {UsersController} from "./users.controller";

@Module({
  imports: [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
