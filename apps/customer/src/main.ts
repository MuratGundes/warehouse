import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './infrastructure/customer.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Customer Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
}
bootstrap().then(() =>
  console.log('Customer Api is listening on port ' + 3002),
);
