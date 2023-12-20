import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 3000;
console.log(
  `Launching NestJS app on port ${port}, URL: http://0.0.0.0:${port}`,
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('1:1 문의사항 API')
    .setDescription(
      'Inquiry 시 questionCategory 와 questionDetail 는 영어 string입니다. <br><br> ex) questionCategory : MEMBER_INFO <br> 한글 및 배열은 삭제하셔야 정상작동 합니다.',
    )
    .setVersion('1.0')
    .addTag('사용 방법')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
