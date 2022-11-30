import { Module } from '@nestjs/common';
import { UserMemoryRepository } from '../user-memory.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, UserMemoryRepository],
  controllers: [AuthController],
})
export class AuthModule {}
