import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpStatus, Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // CORS
  app.enableCors();

  const port = process.env.PORT || 3000;

  // Thiết lập Global Prefix
  app.setGlobalPrefix(process.env.VERSION);
  // Thiết lập Global Interceptor response trả về
  app.useGlobalInterceptors(new TransformInterceptor());

  // -----------------ValidationPipe------------------
  // Sử dụng ValidationPipe để xác thực dữ liệu đầu vào
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các thuộc tính không mong muốn
      forbidNonWhitelisted: true, // Báo lỗi nếu có thuộc tính thừa
      errorHttpStatusCode: HttpStatus.BAD_REQUEST, // Http Status Code
      disableErrorMessages: false, // Hiển thị thông báo lỗi cụ thể, rất hữu ích trong giai đoạn phát triển và debug.
      skipMissingProperties: false, // Yêu cầu tất cả các thuộc tính bắt buộc phải có (theo DTO).
    }),
  );
  // -----------------ValidationPipe------------------

  // -----------------Swagger Docs------------------
  // Viết Swagger Docs cho FE
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('BLOG API docs')
    .setVersion('1.0')
    .addTag('Document For API')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
    });
  SwaggerModule.setup('docs', app, documentFactory);
  // -----------------Swagger Docs------------------

  // -----------------Logger NestJS------------------
  // Log ra cho Terminal
  const logger = new Logger('Bootstrap');
  logger.log(`Application is running on: ${port}`);
  logger.log(`Swagger Docs available at: http://localhost:${port}/docs`);
  // -----------------Logger NestJS------------------

  await app.listen(port);
}
bootstrap();
