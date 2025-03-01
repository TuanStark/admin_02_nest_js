declare const module: any;
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './core/transform.interceptor';
import { HttpExceptionFilter } from './core/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors(
    {
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    credentials: true
    }
    );
  const port = configService.get<number>('PORT');
  app.useGlobalFilters(new HttpExceptionFilter());// loc loi http nhu 2001, 400, 401
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));// cai nay tra ve statusCode, message, data
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.setGlobalPrefix('api/v1', { exclude: [''] });
  await app.listen(port ?? 8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  //CONFIG CORS
 
}
bootstrap();
