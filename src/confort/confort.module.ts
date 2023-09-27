import { Module } from '@nestjs/common';
import { ConfortService } from './confort.service';
import { ConfortController } from './confort.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {Confort} from './models/confort.model'
@Module({
  imports : [
    SequelizeModule.forFeature([Confort])
  ],
  controllers: [ConfortController],
  providers: [ConfortService],
})
export class ConfortModule {}
