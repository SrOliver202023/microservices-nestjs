import { Body, Controller, Post } from "@nestjs/common";
import { SignupService } from "../../services";
import { SignupDTO } from "../../dtos";

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