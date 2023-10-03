import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginDto{
    @ApiProperty({example:'example@gmail.com', description: 'bu email'})
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @IsStrongPassword()
    password:string;
    
}