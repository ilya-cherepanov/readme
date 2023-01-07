import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDTO) {
    const newUserEntity = new UserEntity(dto);
    await this.userRepository.create(newUserEntity);
  }
}
