import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) readonly regionRepo: typeof Region){}

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepo.create(createRegionDto);
  }

  findAll() {
    return this.regionRepo.findAll();
  }

  findOne(id: number) {
    return this.regionRepo.findOne({where:{id}});

  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return this.regionRepo.update(updateRegionDto, {where:{id}, returning:true});

  }

  remove(id: number) {
    return this.regionRepo.destroy({where:{id}});
  }
}
