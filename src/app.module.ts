import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { CategoriesModule } from './categories/categories.module';
import { ConfortModule } from './confort/confort.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { Category } from './categories/models/category.model';
import { Confort } from './confort/models/confort.model';
import { District } from './district/models/district.model';
import { Region } from './region/models/region.model';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
  }),
  SequelizeModule.forRoot({
     dialect:'postgres',
     port: Number(process.env.POSTGRES_PORT),
     host: process.env.POSTGRES_HOST,
     password:process.env.POSTGRES_PASSWORD,
     username:process.env.POSTGRES_USER,
     database:String(process.env.POSTGRES_DB),
     models:[
      User, 
      Category, 
      Confort, 
      District, 
      Region],
     autoLoadModels:true,
     logging:true
  }),
  UsersModule,
  CategoriesModule,
  ConfortModule,
  RegionModule,
  DistrictModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
