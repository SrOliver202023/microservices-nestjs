import { ISignupUseCase } from "@backend-service/src/core";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class SignupDTO implements ISignupUseCase.DTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}