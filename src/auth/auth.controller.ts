import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from '@/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    
  ) {}

  @Post("login")
  @Public()// khong check logic lien quan den jwt
  @UseGuards(LocalAuthGuard)// cai nay khong lien quan den jwt
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @Public()
  handleRegister(@Body() registerDto: CreateAuthDto) {
    return this.authService.register(registerDto);
  }

}
