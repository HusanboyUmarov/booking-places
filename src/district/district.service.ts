import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './models/district.model';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) readonly districtRepo: typeof District
  ){}
  create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepo.create(createDistrictDto);
  }

  findAll() {
    return this.districtRepo.findAll();
  }

  findOne(id: number) {
    return this.districtRepo.findOne({where:{id}});
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.districtRepo.update(updateDistrictDto, { where:{id}, returning:true});
  }

  remove(id: number) {
    return this.districtRepo.destroy({where:{id}});
  }
}
