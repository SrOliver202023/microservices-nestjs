import { NestFactory } from '@nestjs/core';
import { AppModule } from "./modules/app.module";
import { HttpExceptionFilter, ValidationPipe } from "./utils";

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();