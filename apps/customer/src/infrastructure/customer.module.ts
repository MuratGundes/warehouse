import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'libs/infrastructure';
import { CustomerController } from '../api/customer.controller';
import { CustomerRepository } from './customer.repository';
import { Handlers } from '../application';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [CustomerController],
  providers: [...Handlers, CustomerRepository],
})
export class CustomerModule {}
