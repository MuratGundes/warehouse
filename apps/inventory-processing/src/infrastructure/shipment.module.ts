import { Module } from '@nestjs/common';
import { ShipmentController } from '../api/shipment.controller';
import { EventHandlers } from "../integrations";
import { Repositories } from './index';
import { CommandHandlers } from "../application";
import { ExternalCalculationService } from "../application/external-calculation.service";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "libs/infrastructure";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [ShipmentController],
  providers: [...EventHandlers, ...CommandHandlers, ...Repositories, ExternalCalculationService],
})
export class ShipmentModule {}
