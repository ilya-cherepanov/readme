import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateQuotePostDTO } from "./create-quote-post.dto";


export class UpdateQuotePostDTO extends PartialType(OmitType(CreateQuotePostDTO, ['creatorId'] as const))
{}
