import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import TokenPayload from '../types/tokenPayload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const refreshToken = request.headers?.refresh
            .toString()
            .split(' ')[1];

          return refreshToken;
        },
      ]),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.headers?.refresh.toString().split(' ')[1];

    return this.authService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId,
    );
  }
}
