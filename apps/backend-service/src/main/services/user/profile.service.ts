import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UserProfileService {
  constructor (
    @Inject('NOTIFICATION_SERVICE')
    private readonly client: ClientKafka
  ) {}

  async execute (email: string) {
    await lastValueFrom(this.client.emit('notification', { email, timestamp: new Date().toISOString() }))
    return { email, timestamp: new Date().toISOString() }
  }
}