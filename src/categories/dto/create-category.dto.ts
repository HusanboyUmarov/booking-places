import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsNotEmpty()
    @IsNumber()
    parent_id: number
}
