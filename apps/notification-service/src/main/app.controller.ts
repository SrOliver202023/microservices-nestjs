import { Controller } from "@nestjs/common";
import { Ctx, KafkaContext, MessagePattern, Payload } from "@nestjs/microservices";

@Controller({ path: 'api' })
export class AppController {
  @MessagePattern('notification')
  async messagePatter (@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('notification', message);
  }
}