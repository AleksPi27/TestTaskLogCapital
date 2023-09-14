import {Controller, Get, Post, Request, UseGuards,Res, UseInterceptors} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {LoginGuard} from "./request-lifecycle-utils/login.guard";
import {UserDeviceBinder} from "./request-lifecycle-utils/userbinder.interceptor";
import {AuthRoutes} from "../common/route.enum";
import {LOG_OUT} from "../common/general.const";

@Controller()
export class AuthController {
    constructor(private usersService: UsersService) {
    }
    @UseGuards(LoginGuard)
    @Post(AuthRoutes.LOGIN)
    async login(@Request() req, @Res() res){
        res.cookie("user.device", req.headers["user-agent"]);
        res.send(req.user);
    }

    @Post(AuthRoutes.REGISTER)
    async signup(@Request() req, @Res() res){
        res.clearCookie("user.device");
        res.clearCookie("connect.sid");
        res.send(await this.usersService.registerUser(req.body.username, req.body.password));
    }

    @Get(AuthRoutes.LOGOUT)
    logout(@Request() req, @Res() res): any {
        req.session.destroy();
        res.clearCookie("user.device");
        res.clearCookie("connect.sid");
        res.send({ message: LOG_OUT })
    }
}