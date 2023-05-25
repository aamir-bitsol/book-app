import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use('/files', express.static('./files'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'text/html' }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Book User App')
    .setDescription('This App contains Books, Users and their relation')
    .setVersion('1.0')
    .addTag('Books-App')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
