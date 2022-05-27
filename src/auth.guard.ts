import { UserService } from './user/user.service';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      const token = authorization.split('Bearer ');
      const checkValid = await this.userService.validate(token[1]);
      if (!checkValid) throw new ForbiddenException('Authentication failed');
      request.user = checkValid; 
      return true
    } catch (error) {
      return false;
    }
  }
}
