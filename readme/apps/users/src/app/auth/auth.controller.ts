import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { fillObject } from '@readme/core';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { UserRDO } from './rdo/user.rdo';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    return fillObject(LoggedUserRDO, newUser);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDTO) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRDO, verifiedUser);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const existingUser = await this.authService.get(id);

    return fillObject(UserRDO, existingUser);
  }
}
