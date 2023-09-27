import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateConfortDto } from './dto/create-confort.dto';
import { UpdateConfortDto } from './dto/update-confort.dto';
import { Confort } from './models/confort.model';

@Injectable()
export class ConfortService {
  constructor(
    @InjectModel(Confort) readonly  confortRepo: typeof Confort
  ){}
  create(createConfortDto: CreateConfortDto) {
    return this.confortRepo.create(createConfortDto);
  }

  findAll() {
    return this.confortRepo.findAll();
  }

  findOne(id: number) {
    return this.confortRepo.findByPk(id);
  }

  update(id: number, updateConfortDto: UpdateConfortDto) {
    return this.confortRepo.update(
      updateConfortDto, 
      {
        where:{id},
        returning:true
      }
    );
  }

  remove(id: number) {
    return this.confortRepo.destroy({where:{id}});
  }
}
