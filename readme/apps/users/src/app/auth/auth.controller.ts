import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { JWTRefreshGuard } from './guards/jwt-refresh.guard';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { UserRDO } from './rdo/user.rdo';


@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.CREATED,
    description: 'Пользователь успешно зарегистрирован',
  })
  async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    return fillObject(LoggedUserRDO, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRDO,
    status: HttpStatus.OK,
    description: 'Пользователь успешно авторизовался',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Неверная почта или пароль',
  })
  async login(@Body() dto: LoginUserDTO) {
    return this.authService.login(dto);
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'ID пользователя',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: 'Пользователь получен',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  async get(@Param('id') id: string) {
    const existingUser = await this.authService.get(id);

    return fillObject(UserRDO, existingUser);
  }

  @Post('refresh')
  @UseGuards(JWTRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() request: Request) {
    return this.authService.refresh(request.user['id'], request.user['refreshToken']);
  }
}
