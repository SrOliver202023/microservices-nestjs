import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards";

@Controller({ path: 'user' })
export class UserProfileController {

  @UseGuards(AuthGuard)
  @Get('profile')
  async handle (@Request() req: any) {
    return `${req.user.email} profile`
  }
}