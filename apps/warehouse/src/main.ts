import { NestFactory } from '@nestjs/core';
import { WarehouseModule } from './infrastructure/warehouse.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqOptions } from "@nestjs/microservices";
import { getRabbitmqConfig } from "libs/infrastructure/rabbitmq.config";

async function bootstrap() {
  const app = await NestFactory.create(WarehouseModule);
  app.setGlobalPrefix('api');

  //TODO: wire up rabbitmq, it's not working
  app.connectMicroservice<RmqOptions>(getRabbitmqConfig());

  const options = new DocumentBuilder()
    .setTitle('Warehouse Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap().then(() =>
  console.log('Warehouse Api is listening on port ' + 3001),
);
