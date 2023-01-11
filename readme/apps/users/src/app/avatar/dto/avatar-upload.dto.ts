import { ApiProperty } from "@nestjs/swagger";


export class AvatarUploadDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  public avatar: unknown;
}
