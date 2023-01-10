import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';


export const jwtOptions = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
}));


export async function getJWTConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessSecret'),
    signOptions: {expiresIn: '300s', algorithm: 'HS256'},
  };
}
