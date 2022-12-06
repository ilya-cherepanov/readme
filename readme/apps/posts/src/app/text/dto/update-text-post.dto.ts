import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateTextPostDTO } from "./create-text-post.dto";


export class UpdateTextPostDTO extends PartialType(OmitType(CreateTextPostDTO, ['creatorId'] as const))
{}
