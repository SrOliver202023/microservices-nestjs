import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async listenHello (newUser: { email: string, name: string, password: string }) {
    return console.log('email-sender', newUser)
  }
}