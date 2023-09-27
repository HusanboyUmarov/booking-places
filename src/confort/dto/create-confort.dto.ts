import { IsNotEmpty, IsString } from "class-validator";

export class CreateConfortDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    
}
