import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const { login, password } = context.switchToHttp().getRequest().body;

    if (
      login === null ||
      login === null ||
      typeof login !== 'string' ||
      password === null ||
      password === null ||
      typeof password !== 'string'
    ) {
      throw new BadRequestException([
        'login should not be empty',
        'login must be a string',
        'password should not be empty',
        'password must be a string',
      ]);
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
