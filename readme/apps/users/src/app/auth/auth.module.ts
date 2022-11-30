import { Module } from '@nestjs/common';
import { UserMemoryRepository } from '../user-memory.repository';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UserMemoryRepository],
})
export class AuthModule {}
