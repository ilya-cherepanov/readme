import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateVideoPostDTO } from "./create-video-post.dto";


export class UpdateVideoPostDTO extends PartialType(OmitType(CreateVideoPostDTO, ['creatorId'] as const))
{}
