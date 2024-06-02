import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Role, Roles, RolesGuard } from 'libs/api';
import { ShipmentDto } from '../application/shipmentDto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateShipmentCommand } from '../application/create-shipment/create-shipment.command';

@Controller('shipment')
@UseGuards(RolesGuard)
export class ShipmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/create')
  @Roles(Role.CREATE_SHIPMENT)
  async createShipment(
    @Param('id') id: string,
    @Body(ValidationPipe) shipmentDto: ShipmentDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new CreateShipmentCommand(
        id,
        shipmentDto.productId,
        shipmentDto.shipmentType,
        shipmentDto.shipmentDate,
        shipmentDto.quantity,
      ),
    );
  }
}
