import { NestFactory } from '@nestjs/core';
import { AppModule } from "./modules/app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./utils";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'backend-consumer',
      },
    }
  })

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.startAllMicroservices();
  await app.listen(3000)
}
bootstrap();