import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from '@/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
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


  @Get('mail')
  @Public()
  testmail() {
    this.mailerService
      .sendMail({
        to: 'lecongtuan472004@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>Hello World Tuan Stark</b>', // HTML body content
      })
      .then(() => {})
      .catch(() => {});
    return "OK";
  }

}
