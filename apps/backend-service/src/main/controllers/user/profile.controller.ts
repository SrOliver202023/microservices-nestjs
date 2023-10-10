import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards";
import { ProducerService, UserProfileService } from "../../services";
import { Client, ClientKafka, Transport } from "@nestjs/microservices";

@Controller({ path: 'user' })
export class UserProfileController {
  constructor (
    private readonly userProfileService: UserProfileService
  ) {}
  @UseGuards(AuthGuard)
  @Get('profile')
  async handle (@Request() req: any) {
    await this.userProfileService.execute(req.user.email)
    return `${req.user.email} profile`
  }

}