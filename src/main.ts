import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { LoggerFactory } from './logger/loggerFactory';

const start = async()=>{
try {
  const app = await NestFactory.create(AppModule, {
    logger:LoggerFactory('Stadium')
  });
  // app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
  .setTitle('Stadium finder')
  .setDescription('mini Project for stadium')
  .setVersion('1.0.0')
  .addTag('NodeJs, NestJs, Postgres, Sequelize, JWT, Swagger')
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  app.use(cookieParser())
  await app.listen(3000, ()=>{
    console.log(`server is running on ${3000} port`)
  });
  
} catch (error) {
  
}

}
start()
