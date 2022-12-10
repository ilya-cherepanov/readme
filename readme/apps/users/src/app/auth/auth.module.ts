import { Module } from '@nestjs/common';
// import { UserMemoryRepository } from '../user-memory.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../user.model';
import { UserRepository } from '../user.repository';


@Module({
  imports: [MongooseModule.forFeature([
    {name: UserModel.name, schema: UserSchema},
  ])],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
