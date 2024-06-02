import { Module } from '@nestjs/common';
import { WarehouseService } from '../domain/warehouse/warehouse.service';
import { WarehouseResolver } from '../api/warehouse.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'libs/infrastructure';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Handlers } from '../integrations';
import { Repositories } from './index';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'scripts/graphQL/schema.gql'),
      sortSchema: true,
      path: 'graphql',
    }),
  ],
  providers: [
    ...Handlers,
    ...Repositories,
    WarehouseResolver,
    WarehouseService,
  ],
})
export class WarehouseModule {}
