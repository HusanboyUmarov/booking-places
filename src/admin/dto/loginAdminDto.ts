import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginAdminDto{
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsStrongPassword()
    @IsString()
    password:string;
}