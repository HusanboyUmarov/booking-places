import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { User } from 'src/users/models/user.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/loginAdminDto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo:typeof Admin,
    private readonly jwtService: JwtService,
  ){}

  async loginAdmin(loginAdminDto:LoginAdminDto){
    const admin = await this.adminRepo.findOne({where:{email:loginAdminDto.email}})

    if(!admin)
    throw new BadRequestException({message: "email or password is not correct"})

    const comparing = await compare(loginAdminDto.password, admin.hashed_assword)

    if(!comparing)
    throw new BadRequestException({message: 'password or email is not correct'})

    const tokens = await this.getToken(admin)
    return tokens


  }

  async getToken(admin:Admin){
    const jwtPayload = {
      id: admin.id , 
      is_active: admin.is_active,
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload,{
        secret:process.env.ACCESS_TOKEN_KEY,
        expiresIn:process.env.ACCESS_TOKEN_TIME
      }),
      
      this.jwtService.signAsync(jwtPayload,{
        secret:process.env.REFRESH_TOKEN_KEY,
        expiresIn:process.env.REFRESH_TOKEN_TIME
      }),
    ]);

    return {
      access_token: accessToken, 
      refresh_token:refreshToken
    }

  }
 
}
