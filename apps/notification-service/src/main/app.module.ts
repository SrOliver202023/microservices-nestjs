import { Module } from '@nestjs/common';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([
    {
      name: 'NOTIFICATION_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'notifcation',
          brokers: ['localhost:9092'],
        }
      }
    },
  ])],
  controllers: [AppController],
  providers: [AppService],
  exports: [ClientsModule.register([
    {
      name: 'NOTIFICATION_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'notifcation',
          brokers: ['localhost:9092'],
        }
      }
    },
  ])]
})
export class AppModule {}