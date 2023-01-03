import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'


const BAD_MONGOID_ERROR = 'Bad entity ID';
const MONGOID_NOT_STRING_ERROR = 'MongoId must be a string!';


@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: unknown, {type}: ArgumentMetadata): string {
    if (type !== 'param') {
      throw new Error('This pipe must used only with params!')
    }

    if (typeof value !== 'string') {
      throw new BadRequestException(MONGOID_NOT_STRING_ERROR);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
