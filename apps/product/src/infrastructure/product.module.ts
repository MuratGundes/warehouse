import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from '../api/product.controller';
import { Handlers } from '../application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'libs/infrastructure/typeorm.config';
import { ProductRepository } from './product.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [ProductController],
  providers: [...Handlers, ProductRepository],
})
export class ProductModule {}
