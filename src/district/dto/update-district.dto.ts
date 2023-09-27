import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDistrictDto } from './create-district.dto';

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?:string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    region_id?:number;
}
