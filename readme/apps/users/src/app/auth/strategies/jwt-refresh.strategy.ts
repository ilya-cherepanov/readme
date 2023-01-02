import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JWTPayload } from '@readme/shared-types';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';



@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.refreshSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JWTPayload) {
    const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();

    return {
      id: payload.id,
      email: payload.email,
      refreshToken
    };
  }
}
