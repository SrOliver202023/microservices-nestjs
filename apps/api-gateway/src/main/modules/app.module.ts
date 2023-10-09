import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "./auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "../infra";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'EMAIL_SENDER',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0'
        }
      },
    ]),
    AuthModule
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [
    PrismaService,
    ClientsModule.register([
      {
        name: 'EMAIL_SENDER',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0'
        }
      },
    ]),
  ]
})
export class AppModule {}