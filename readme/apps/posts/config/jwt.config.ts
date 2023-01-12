import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_ACCESS_EXPIRES_IN } from '../src/app/posts.constants';


export const jwtOptions = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
}));


export async function getJWTConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessSecret'),
    signOptions: {expiresIn: JWT_ACCESS_EXPIRES_IN, algorithm: 'HS256'},
  };
}
