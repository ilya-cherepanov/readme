import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../user.model';
import { UserRepository } from '../user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../config/jwt.config';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: UserModel.name, schema: UserSchema},
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    }),
  ],
  providers: [AuthService, UserRepository, JWTStrategy, JWTRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
