import { PartialType } from "@nestjs/swagger";
import { CreateQuotePostDTO } from "./create-quote-post.dto";


export class UpdateQuotePostDTO extends PartialType(CreateQuotePostDTO)
{}
