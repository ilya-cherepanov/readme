import { PartialType } from "@nestjs/swagger";
import { CreateVideoPostDTO } from "./create-video-post.dto";


export class UpdateVideoPostDTO extends PartialType(CreateVideoPostDTO)
{}
