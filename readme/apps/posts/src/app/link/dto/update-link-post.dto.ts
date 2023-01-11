import { PartialType } from "@nestjs/swagger";
import { CreateLinkPostDTO } from "./create-link-post.dto";


export class UpdateLinkPostDTO extends PartialType(CreateLinkPostDTO)
{}
