import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import session from 'express-session';
import { Pool } from 'pg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  // const sessionRepo = app.get(DataSource).getRepository(Sessions);
  const expressSession = require('express-session');
  const pgSession = require('connect-pg-simple')(expressSession);
  const pgPool = new Pool({
    host: 'localhost',
    database: 'booksdb',
    password: "root",
    user: 'postgres',
    port: 5432,
  })

  app.use('/files', express.static('./files'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'text/html' }));
  app.use(bodyParser.json());
  app.use(session({
    name: 'NESTJS_SESSION_ID',
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pgPool,
      tableName: 'sessions',
    }),
    cookie: {
      maxAge: 60000,
    }
  }))
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
