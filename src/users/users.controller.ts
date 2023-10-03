import { Controller, Get, Post, Body, Patch, Param, Delete , Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Response, Request} from 'express'
import { LoginDto } from './dto/login-user.dto';
import { cookieGetter } from 'src/decorators/cookieGetter.decorator';
import { PhoneUserDto } from './dto/phoneuserDto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signout')
  async signOut(
    @cookieGetter('refresh token') refreshtoken:string,
    @Res({passthrough:true}) res:Response
  )
  {
    return this.usersService.logout(refreshtoken, res)
  }

  @Post('login')
  async login(@Body() loginDto:LoginDto){
    return this.usersService.login(loginDto)
  }

  @Post('/otp')
  newOtp(@Body() phoneUserDto:PhoneUserDto){
    return this.usersService.newOTP(phoneUserDto)
  }

  @Post('signup')
  async registration(
    @Body() creaUserDto: CreateUserDto,
    @Res({passthrough: true})  res: Response
  ){
    return this.usersService.registration(creaUserDto, res)

  }

  @Get('activate/:link')
  astivate(@Param('link') link :string){
    return this.usersService.activate(link)
  }

}
