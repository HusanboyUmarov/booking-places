import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDistrictDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    region_id:number;
}
