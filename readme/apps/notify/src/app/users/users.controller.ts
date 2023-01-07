import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@readme/shared-types';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern({cmd: CommandEvent.CreateUser})
  public async createUser(dto: CreateUserDTO) {
    await this.usersService.create(dto);
  }
}
