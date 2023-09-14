import {ExecutionContext, Injectable, NestInterceptor, CallHandler} from "@nestjs/common";
import { Observable } from 'rxjs';

@Injectable()
export class UserDeviceBinder implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        res.cookie("user.device", req.headers["user-agent"]);
        return next.handle();
    }
}