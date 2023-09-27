import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) readonly categoryRepo: typeof Category
  ){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.findAll();
  }

  findOne(id: number) {
    return this.categoryRepo.findByPk(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepo.update(updateCategoryDto, {where:{id}, returning:true});
  }

  remove(id: number) {
    return this.categoryRepo.destroy({where:{id}});
  }
}
