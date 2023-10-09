import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { ISignupUseCase } from "@api-gateway/src/core";
import { SignupService } from "../../services";
import { SignupDTO } from "../../dtos";
import { HttpExceptionFilter } from "../../utils";

@Controller({ path: 'auth', })
export class SignupController {
  constructor (
    private signupService: SignupService
  ) {}

  @Post('signup')
  async singup (@Body() body: SignupDTO) {
    return await this.signupService.execute(body)
  }
}