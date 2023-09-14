import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "./users.entity";
import bcrypt from "bcrypt";
import {UsersRepository} from "./users.repository";
import {EXISTING_USERNAME} from "../common/exception.const";
import {UsernameResponse} from "./users.interface";
const { SALT_ROUNDS } = process.env;

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async findUser(username: string): Promise<User | null> {
        return this.usersRepository.findOne(username);
    }

    async findUsers(): Promise<UsernameResponse[] | null> {
        return (await this.usersRepository.findAll()).map(user => ({ username: user.username }));
    }
    async registerUser(username: string, password: string): Promise<UsernameResponse> {
            const foundUser = await this.findUser(username);
            if (foundUser) {
                throw new UnauthorizedException(EXISTING_USERNAME)
            } else {
                const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
                const hashedPassword = await bcrypt.hash(password, salt);
                const registeredUser = await this.usersRepository.save(username, hashedPassword, salt);
                return { username: registeredUser.username }
            }
    }
}
