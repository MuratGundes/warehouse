import { NestFactory } from '@nestjs/core';
import { ProductModule } from './infrastructure/product.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Product Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().then(() => console.log('Product Api is listening on port ' + 3000));
