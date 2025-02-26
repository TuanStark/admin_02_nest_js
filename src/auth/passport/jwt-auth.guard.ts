import { IS_PUBLIC_KEY } from "@/decorator/customize";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    // kiem tra co chay guard hay khong
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            return true;
          }
        return super.canActivate(context);
      }
    
      handleRequest(err, user, info) {
        if (err || !user) {
          throw err || new UnauthorizedException("AccessToken is invalid");
        }
        return user;
      }
}
