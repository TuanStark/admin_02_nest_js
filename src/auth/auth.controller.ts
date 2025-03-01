import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from '@/decorator/customize';
import { CreateAuthDto, CodeAuthDto } from './dto/create-auth.dto';
import { ResponseMessage } from '@/decorator/customize';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  @ResponseMessage('Login success')
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

  @Post('check-code')
  @Public()
  handleCheckCode(@Body() registerDto: CodeAuthDto) {
    return this.authService.checkCode(registerDto);
  }



  // @Get('mail')
  // @Public()
  // testmail() {
  //   this.mailerService
  //     .sendMail({
  //       to: 'lecongtuan472004@gmail.com', // list of receivers
  //       subject: 'Testing Nest MailerModule ✔', // Subject line
  //       text: 'welcome', // plaintext body
  //       // html: '<b>Hello World Tuan Stark</b>', // HTML body content
  //       template: 'register.hbs',
  //       context: {
  //         name: 'Tuan Stark',
  //         activationCode: 123456789,
  //       },
  //     })
  //     .then(() => {})
  //     .catch(() => {});
  //   return "OK";
  // }

}
