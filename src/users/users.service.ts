import { Injectable, BadRequestException, Post, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import {Response, Request} from 'express'
import { MailService } from 'src/mail/mail.service';
import { LoginDto } from './dto/login-user.dto';
import { PhoneUserDto } from './dto/phoneuserDto';
import * as otpGenerator from 'otp-generator'
import { BotService } from 'src/bot/bot.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Otp } from 'src/otp/models/otp.model';
import { AddMinutesToDate } from 'src/helpers/addMinutes';
import { encode } from 'src/helpers/crypto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly botService: BotService,

  ){}

  async newOTP(phoneuserDto:PhoneUserDto){
    const phone_number = phoneuserDto.phone
    console.log(phone_number)
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets:false,
      specialChars:false
    });

    const isSend = await this.botService.sendOPT(phone_number, otp);
    if(! isSend){
      throw new HttpException('Avval royxatdan oting', HttpStatus.BAD_REQUEST);

    }
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({
      where:{check:phone_number},
    });
    const newOtp = await this.otpRepo.create({
      id:uuid.v4(),
      otp,
      expiration_time,
      check: phone_number,
      
    });
    const details = {
      timestemp:now, 
      check:phone_number,
      otp_id: newOtp.id

    }
    const encoded = await encode(JSON.stringify(details));
    return  {status: 'Success', Details:encoded}
  }


  async logout(refresh_token: string, res:Response){
    const userData = await this.jwtService.verify(refresh_token, {
      secret:process.env.REFRESH_TOKEN
    })
    if(!userData){
      throw new ForbiddenException('user not found')
    }
    const UpdateUser = await this.userRepo.update(
      {hashed_refresh_token:null},
      {where:{id:userData.id}, returning:true}
      )
    
    res.clearCookie('refresh_token');
    const response = {
      message: 'user has logged out successfully',
      user : UpdateUser[1][0]
    };
    return response

  }


  async login(loginDto:LoginDto){
    const user = await this.userRepo.findOne({where:{email:loginDto.email}})
    if(!user) throw new UnauthorizedException({message: 'user does not exsist'})
    const isPassword = await bcrypt.compare(loginDto.password, user.hashed_password)
    if(!isPassword) throw new UnauthorizedException('password is not currect')
    return this.getToken(user)

    
  
  }
  
  async activate(link:string){
    if(!link){
      throw new BadRequestException('Activation link not found')
    }
    const updateUse = await this.userRepo.update(
      {is_active:true}, 
      {where:{activation_link:link, is_active:false}, returning:true}
    );
    if(!updateUse[1][0])
    throw new BadRequestException('user already activated')
    
    const response = {
      message: 'user has activated',
      user: updateUse
    }

    return response


  }

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
    console.log(hashed_password)
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

    try {
      const data = await this.mailService.sendUserConfirm(updateUser[1][0]);
      console.log(data)
    } catch (error) {
     console.log(error) 
    }

    const response ={
      message: 'User registered',
      user: updateUser[1][0],
      tokens

    }
    
    return response

  }

  
}
