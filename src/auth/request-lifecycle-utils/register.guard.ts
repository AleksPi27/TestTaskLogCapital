import {Injectable, ExecutionContext, CanActivate} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Express.Request>();
        return request.isAuthenticated();
    }
}