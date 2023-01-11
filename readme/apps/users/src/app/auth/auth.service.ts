import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, JWTPayload } from '@readme/shared-types';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../user.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, JWT_REFRESH_TOKEN_EXPIRES_IN, RABBITMQ_SERVICE, REFRESH_TOKEN_NOT_MATCH } from '../user.constants';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import axios from 'axios';
import { PostCountResponse } from '../../types/post-count-response.interface';


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


    const newUser = await this.userRepository.create(newUserEntity);
    const tokens = await this.getTokens({
      id: newUser._id.toString(),
      email: newUser.email,
    });
    await newUserEntity.setRefreshToken(tokens.refreshToken);
    await this.userRepository.update(newUser._id.toString(), newUserEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreateUser},
      {
        email: newUser.email,
        userId: newUser._id.toString(),
      },
    );

    return tokens;
  }

  async login({email, password}: LoginUserDTO) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existingUser);
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

    const postCount = await this.loadPostsCount(existingUser._id);
    if (!postCount) {
      return existingUser;
    }

    return {
      ...existingUser,
      posts: postCount.count,
    };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ForbiddenException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(user);

    if (!await userEntity.checkRefreshToken(refreshToken)) {
      throw new ForbiddenException(REFRESH_TOKEN_NOT_MATCH);
    }

    const tokens = await this.getTokens({
      id: userEntity._id.toString(),
      email: userEntity.email
    });

    await userEntity.setRefreshToken(tokens.refreshToken);
    await this.userRepository.update(userId, userEntity);

    return tokens;
  }

  async changePassword(userId: string, dto: ChangePasswordDTO) {
    const existingUser = await this.userRepository.findById(userId);

    const userEntity = new UserEntity(existingUser);
    if (!await userEntity.checkPassword(dto.password)) {
      throw new ForbiddenException(AUTH_USER_PASSWORD_WRONG);
    }

    await userEntity.setPassword(dto.newPassword);
    await this.userRepository.update(userEntity._id, userEntity);
  }

  private async getTokens(payload: JWTPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async loadPostsCount(userId: string): Promise<PostCountResponse | null> {
    try {
      const urlPrefix = this.configService.get<string>('post.urlPrefix');
      const response = await axios.get<PostCountResponse>(`${urlPrefix}count/${userId}`);
      return response.data;
    } catch {
      return null;
    }
  }
}
