import { OmitType, PartialType } from "@nestjs/swagger";
import { CreatePhotoPostDTO } from "./create-photo-post.dto";


export class UpdatePhotoPostDTO extends PartialType(OmitType(CreatePhotoPostDTO, ['creatorId'] as const))
{}
