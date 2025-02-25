import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: config.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],// import vao de xai duoc usersService
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
