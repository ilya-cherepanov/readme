import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_AUTH_TOKEN_EXPIRES_IN } from '../user.constants';


export const jwtOptions = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
}));


export async function getJWTConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessSecret'),
    signOptions: {expiresIn: JWT_AUTH_TOKEN_EXPIRES_IN, algorithm: 'HS256'},
  };
}
