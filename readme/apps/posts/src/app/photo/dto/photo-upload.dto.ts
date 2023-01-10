import { ApiProperty } from "@nestjs/swagger";

export class PhotoUploadDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  public photo: any;
}
