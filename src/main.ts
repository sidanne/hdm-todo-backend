import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Autorise le frontend React à accéder à l'API
  app.enableCors({
    origin: 'http://localhost:5173', // autorise le frontend
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
