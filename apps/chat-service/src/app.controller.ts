import { Controller, Get } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Controller({ path: 'api' })
export class AppController {
  constructor (
    private readonly appService: AppService
  ) {}

  @Get('hello')
  async getHello () {
    return "hello"
  }

  @EventPattern('user_created')
  async listenHelloEvent (newUser: { email: string, name: string, password: string }) {
    return await this.appService.listenHello(newUser)
  }
}