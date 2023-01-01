import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';


export const jwtOptions = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
}));


export async function getJWTConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.secret'),
    signOptions: {expiresIn: '300s', algorithm: 'HS256'},
  };
}
