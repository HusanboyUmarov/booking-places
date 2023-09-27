import { IsString , IsDateString, IsEmail, IsNotEmpty, IsStrongPassword, IS_EMAIL, MinLength, IsPhoneNumber} from "class-validator";
import {  } from "class-validator/types/decorator/decorators";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @IsStrongPassword()
    confirm_password:string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @IsStrongPassword()
    password:string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('UZ')
    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsString()
    @IsNotEmpty()
    telegram_link: string;

    @IsNotEmpty()
    @IsDateString()
    birthday:Date;
}
