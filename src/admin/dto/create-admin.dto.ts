import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    telegram_link:string;

    @IsStrongPassword()
    @IsNotEmpty()
    password:string;
    
    @IsNotEmpty()
    confirm_password:string;

}
