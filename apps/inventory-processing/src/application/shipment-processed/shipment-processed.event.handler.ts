import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Logger } from '@nestjs/common';
import { ShipmentProcessedEvent } from '../../domain/shipment/shipment-processed.domain.event';
import { InventoryRepository } from "../../infrastructure/inventory.repository";
import { Inventory } from "../../domain/inventory/inventory.entity";
import { InventoryWarehouseRepository } from "../../infrastructure/inventory-warehouse.repository";
import { InventoryProductRepository } from "../../infrastructure/inventory-product.repository";

@EventsHandler(ShipmentProcessedEvent)
export class ShipmentProcessedEventHandler implements IEventHandler<ShipmentProcessedEvent>
{
  private readonly logger = new Logger(ShipmentProcessedEventHandler.name);
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly warehouseRepository: InventoryWarehouseRepository,
    private readonly productRepository: InventoryProductRepository,
    ) {}
  async handle(event: ShipmentProcessedEvent) {
    this.logger.log(
      `Create New Inventory Event: ${JSON.stringify(event)}`,
    );
    const { warehouseId, productId, size } = event;

    const warehouse = await this.warehouseRepository.getById(warehouseId);
    const product = await this.productRepository.getById(productId);

    const inventory = Inventory.create(
      warehouse,
      product,
      size,
    );

    await this.inventoryRepository.createInventory(inventory);
  }
}
