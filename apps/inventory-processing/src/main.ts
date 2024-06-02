import { NestFactory } from '@nestjs/core';
import { ShipmentModule } from './infrastructure/shipment.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ShipmentModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('InventoryProcessing Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3003);
}
bootstrap().then(() =>
  console.log('InventoryProcessing Api is listening on port ' + 3003),
);
