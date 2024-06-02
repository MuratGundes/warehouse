import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';
import { CreateShipmentCommand } from './create-shipment.command';
import { InventoryWarehouseRepository } from '../../infrastructure/inventory-warehouse.repository';
import { InventoryProductRepository } from '../../infrastructure/inventory-product.repository';
import { Shipment } from '../../domain/shipment/shipment.entity';
import { ShipmentRepository } from '../../infrastructure/shipment.repository';
import { ShipmentProcessedEvent } from '../../domain/shipment/shipment-processed.domain.event';
import { ExternalCalculationService } from "../external-calculation.service";

@CommandHandler(CreateShipmentCommand)
export class CreateShipmentHandler implements ICommandHandler<CreateShipmentCommand>
{
  private readonly logger = new Logger(CreateShipmentHandler.name);
  constructor(
    private readonly warehouseRepository: InventoryWarehouseRepository,
    private readonly productRepository: InventoryProductRepository,
    private readonly shipmentRepository: ShipmentRepository,
    private readonly calculationService: ExternalCalculationService,
  ) {}

  async execute(command: CreateShipmentCommand) {
    this.logger.log(`Creating Shipment: ${JSON.stringify(command)}`);

    const { warehouseId, productId, shipmentType,
      shipmentDate, size } = command;

    const warehouse = await this.warehouseRepository.getById(+warehouseId);
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with id ${warehouseId} not found`);
    }

    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    //TODO: Check if there are any hazardous products in the warehouse before shipment

    const shipment = Shipment.create(
      warehouse,
      product,
      size,
      shipmentType,
      shipmentDate,
    );
    await this.shipmentRepository.createShipment(shipment);

    const calculationResponse = await this.calculationService.getCalculations();

    if (calculationResponse.isSuccessful) {
      shipment.apply(
        new ShipmentProcessedEvent(
          warehouse.id,
          product.productId,
          size,
        ),
      );
      shipment.commit();
    } else {
      throw new Error('Error while processing shipment');
    }
  }
}
