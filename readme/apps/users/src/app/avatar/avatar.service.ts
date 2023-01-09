import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../user.repository';


@Injectable()
export class AvatarService {
  constructor(private readonly userRepository: UserRepository) {}

  async saveAvatar(userId: string, fileName: string) {
    const existingUser = await this.userRepository.findById(userId);
    const userEntity = new UserEntity(existingUser);
    userEntity.avatar = fileName;
    await this.userRepository.update(userId, userEntity);

    return {
      avatar: userEntity.avatar,
    }
  }
}
