import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform (value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    const customErrorsFields = errors.map(error => ({ field: error.property, details: Object.values(error.constraints) }))

    if (customErrorsFields.length > 0) {
      throw new BadRequestException({
        message: 'invalid fields',
        errors: customErrorsFields,
      });
    }

    return value;
  }

  private toValidate (metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}