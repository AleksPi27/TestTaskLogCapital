import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { UsernameResponse} from "../users/users.interface";
import bcrypt from "bcrypt";
import {INVALID_CREDENTIALS, UNKNOWN_USER} from "../common/exception.const";
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<UsernameResponse> {
        const user = await this.usersService.findUser(username);
       if (!user) {
           throw new UnauthorizedException(UNKNOWN_USER);
       }
        if (await this.validatePassword(
            password,
            user.password,
            user.salt,
        )) {
            return { username: username };
        }
        throw new Error(INVALID_CREDENTIALS);
    }

    async validatePassword(password: string, hash: string, salt: string): Promise<boolean> {
        const hashVerify = await bcrypt.hash(password, salt);
        return hash === hashVerify;
    }
}
