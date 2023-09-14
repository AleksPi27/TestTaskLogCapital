import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./request-lifecycle-utils/local.strategy";
import {LoginGuard} from "./request-lifecycle-utils/login.guard";
import {UserSerializer} from "./request-lifecycle-utils/user.serializer";
import {AuthenticatedGuard} from "./request-lifecycle-utils/register.guard";
import {AuthController} from "./auth.controller";

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, LoginGuard, UserSerializer, AuthenticatedGuard],
  exports: [LocalStrategy, LoginGuard, AuthenticatedGuard],
  controllers: [AuthController]
})
export class AuthModule {}
