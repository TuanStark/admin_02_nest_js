import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordhelper } from '@/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password || !await comparePasswordhelper(password, user.password)) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    if(!user) return null;
    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: CreateAuthDto) {
   return await this.usersService.handleRegister(registerDto); 
  }
}
