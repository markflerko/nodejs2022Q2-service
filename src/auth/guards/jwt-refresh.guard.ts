import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import TokenPayload from '../types/tokenPayload.interface';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const { refreshToken } = context.switchToHttp().getRequest().body;

    const decodedJwtAccessToken: TokenPayload = this.jwtService.decode(
      refreshToken,
    ) as TokenPayload;

    const exp = decodedJwtAccessToken.exp;

    if (exp < Date.now() / 1000) {
      throw new ForbiddenException('Refresh token is expired');
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
