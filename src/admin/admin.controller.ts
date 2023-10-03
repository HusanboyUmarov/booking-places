import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';

import { LoginAdminDto } from './dto/loginAdminDto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body() loginAdminDto:LoginAdminDto){
    return this.adminService.loginAdmin(loginAdminDto)
  }

}
