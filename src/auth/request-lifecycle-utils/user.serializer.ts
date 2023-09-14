import {PassportSerializer} from "@nestjs/passport";
import {Expression} from "mongoose";
import {deserializeUser} from "passport";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user);
    }
    deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
        done(null, payload)
    }
}