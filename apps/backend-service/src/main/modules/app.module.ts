import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "./auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "../infra";
import { UserModule } from "./user.module";
import { TokenAdapterProvider } from "../providers";


const modules: DynamicModule[] = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  ClientsModule.register([
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
  ])
]

@Global()
@Module({
  imports: [
    ...modules,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [PrismaService, TokenAdapterProvider],
  exports: [
    PrismaService,
    ...modules,
    TokenAdapterProvider
  ]
})
export class AppModule {

}