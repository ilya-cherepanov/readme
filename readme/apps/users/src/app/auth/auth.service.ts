import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, JWTPayload } from '@readme/shared-types';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, RABBITMQ_SERVICE } from './auth.constants';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async register({name, email, password}: CreateUserDTO) {
    const existsUser = await this.userRepository.findByEmail(email);
    if (existsUser) {
      throw new BadRequestException(AUTH_USER_EXISTS);
    }

    const newUserEntity = await (new UserEntity({
      name,
      email,
      password: '',
      subscribers: 0,
      posts: 0,
      createdAt: new Date(),
    })).setPassword(password);

    const tokens = await this.getTokens({
      id: newUserEntity._id,
      email: newUserEntity.email,
    });

    await newUserEntity.setRefreshToken(tokens.refreshToken);
    const newUser = await this.userRepository.create(newUserEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreateUser},
      {
        email: newUser.email,
        userId: newUser._id,
      },
    );

    return tokens;
  }

  async login({email, password}: LoginUserDTO) {
    const existsUser = await this.userRepository.findByEmail(email);

    if (!existsUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existsUser);
    if (!await userEntity.checkPassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    const tokens = await this.getTokens({
      id: userEntity._id,
      email: userEntity.email,
    });

    await userEntity.setRefreshToken(tokens.refreshToken);
    await this.userRepository.update(userEntity._id, userEntity);

    return tokens;
  }

  async get(id: string) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new BadRequestException(AUTH_USER_NOT_FOUND);
    }

    return existingUser;
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ForbiddenException('Access denied!');
    }

    const userEntity = new UserEntity(user);

    if (!await userEntity.checkRefreshToken(refreshToken)) {
      throw new ForbiddenException('Access denied!');
    }

    const tokens = await this.getTokens({
      id: userEntity._id,
      email: userEntity.email
    });

    await userEntity.setRefreshToken(tokens.refreshToken);
    await this.userRepository.update(userId, userEntity);

    return tokens;
  }

  private async getTokens(payload: JWTPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
