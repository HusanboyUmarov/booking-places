import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfortService } from './confort.service';
import { CreateConfortDto } from './dto/create-confort.dto';
import { UpdateConfortDto } from './dto/update-confort.dto';

@Controller('confort')
export class ConfortController {
  constructor(private readonly confortService: ConfortService) {}

  @Post('create')
  create(@Body() createConfortDto: CreateConfortDto) {
    return this.confortService.create(createConfortDto);
  }

  @Get('')
  findAll() {
    return this.confortService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confortService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfortDto: UpdateConfortDto) {
    return this.confortService.update(+id, updateConfortDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.confortService.remove(+id);
  }
}
