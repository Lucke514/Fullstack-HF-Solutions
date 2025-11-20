import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Inicializar la app como una instancia de NestJS
  const app = await NestFactory.create(AppModule);
  
  // Instanciar los pipes de class-validator 
  app.useGlobalPipes(new ValidationPipe({
    whitelist            : true,
    forbidNonWhitelisted : true,
    transform            : true
  }));

  // Configuracion de cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Levantar la app 
  await app.listen(envs.PORT, () => {
    Logger.log(`Backend corriendo en el puerto: ${envs.PORT}`, 'Bootstrap');  
  });
}
bootstrap();
