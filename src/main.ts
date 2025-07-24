import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // CORS activé
  await app.listen(3000);
}
bootstrap();
