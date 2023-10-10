import { Body, Controller, Post } from "@nestjs/common";
import { SigninService } from "../../services";
import { SigninDTO } from "../../dtos";

@Controller({ path: 'auth' })
export class SigninController {
  constructor (
    private signinService: SigninService
  ) {}

  @Post('signin')
  async signin (@Body() body: SigninDTO) {
    return await this.signinService.execute(body)
  }
}