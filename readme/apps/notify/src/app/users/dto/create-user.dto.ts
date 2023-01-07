import { IsEmail, IsMongoId } from "class-validator";


export class CreateUserDTO {
  @IsEmail()
  public email: string;

  @IsMongoId()
  public userId: string;
}
