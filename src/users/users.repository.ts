import {InjectModel} from "@nestjs/mongoose";
import {User} from "./users.entity";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findOne(username: string): Promise<User | null> {
        return this.userModel.findOne({ username: username });
    }

    async findAll(): Promise<User[] | null> {
        return this.userModel.find();
    }

    async save(username: string, password: string, salt: string): Promise<User> {
        return this.userModel.create({username, password, salt});
    }
}