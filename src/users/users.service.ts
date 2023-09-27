import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import {Response, Request} from 'express'
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService 
  ){}


  async getToken(user:User){
    const jwtPayload = {
      id: user.id, 
      is_active: user.is_active,
      is_owner: user.is_owner
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

  async registration(createUserDto:CreateUserDto, res:Response){
    const user = await this.userRepo.findOne({
      where:{username: createUserDto.username},
    });
    if(user){
      throw new BadRequestException('user already exist')
    }

    if(createUserDto.password !== createUserDto.confirm_password){
      throw new BadRequestException('confim password is not match password')
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7)
    const newUser = await this.userRepo.create({
      ...createUserDto, 
      hashed_password:hashed_password,
    })
    const tokens =await this.getToken(newUser)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const unuquieKey: string = uuid.v4()

    const updateUser = await this.userRepo.update({
      hashed_refresh_token:hashed_refresh_token, 
      activation_link:unuquieKey
    }, 
    {
      where:{id:newUser.id}, 
      returning:true
    })
    res.cookie('refresh_token' ,tokens.refresh_token , {
      maxAge:1000*60*24*15, 
      httpOnly:true
    });

    // try {
    //   await this.mailService.SendUserConfirmation(updateUser[1][0]);
      
    // } catch (error) {
    //  console.log(error) 
    // }

    const response ={
      message: 'User registered',
      user: updateUser[1][0],
      tokens

    }
    
    return response

  }

  

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
