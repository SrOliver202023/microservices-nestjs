import { ISigninUseCase } from "@api-gateway/src/core";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class SigninDTO implements ISigninUseCase.DTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}