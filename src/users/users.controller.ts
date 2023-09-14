import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {AuthenticatedGuard} from "../auth/request-lifecycle-utils/register.guard";
import {USERS_LIST} from "../common/route.enum";
import {UsersService} from "./users.service";
import { UsernameResponse } from "./users.interface";

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {
    }
    @UseGuards(AuthenticatedGuard)
    @Get(USERS_LIST)
    async getInfo(): Promise<UsernameResponse[] | null> {
        return this.usersService.findUsers();
    }
}