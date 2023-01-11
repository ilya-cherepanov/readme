import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, MongoIdValidationPipe } from '@readme/core';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { TokensRDO } from './rdo/tokens.rdo';
import { UserRDO } from './rdo/user.rdo';


@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    type: TokensRDO,
    status: HttpStatus.CREATED,
    description: 'Пользователь успешно зарегистрирован',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Такой пользователь с таким email уже существует',
  })
  async create(@Body() dto: CreateUserDTO) {
    const tokens = await this.authService.register(dto);
    return fillObject(TokensRDO, tokens);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: TokensRDO,
    status: HttpStatus.OK,
    description: 'Пользователь успешно авторизовался',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Неверная почта или пароль',
  })
  async login(@Body() dto: LoginUserDTO) {
    const tokens = await this.authService.login(dto);
    return fillObject(TokensRDO, tokens);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID пользователя',
    example: '63b1b72b07247fd1feca2cbc',
  })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: 'Пользователь получен',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Пользователь не найден',
  })
  async get(@Param('id', MongoIdValidationPipe) id: string) {
    const existingUser = await this.authService.get(id);

    return fillObject(UserRDO, existingUser);
  }

  @Post('refresh')
  @UseGuards(JWTRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: TokensRDO,
    status: HttpStatus.OK,
    description: 'Обновляет токены авторизации',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Неверный refresh токен'
  })
  async refresh(@Req() request: Request) {
    const tokens = await this.authService.refresh(request.user['id'], request.user['refreshToken']);
    return fillObject(TokensRDO, tokens);
  }

  @Post('change-password')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пароль изменен',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Неверный или истекший access токен'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Неверный пароль',
  })
  async changePassword(@Req() request: Request, @Body() dto: ChangePasswordDTO) {
    await this.authService.changePassword(request.user['id'], dto);
  }
}
