import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Logger } from '@nestjs/common';
import { WarehouseCreatedDomainEvent } from '../../../warehouse/src/domain/warehouse/warehouse-created.domain.event';
import { InventoryWarehouseRepository } from '../infrastructure/inventory-warehouse.repository';
import { InventoryWarehouse } from '../domain/inventory-warehouse/inventory-warehouse.entity';

@EventsHandler(WarehouseCreatedDomainEvent)
export class WarehouseCreatedEventHandler implements IEventHandler<WarehouseCreatedDomainEvent>
{
  private readonly logger = new Logger(WarehouseCreatedEventHandler.name);
  constructor(private readonly repository: InventoryWarehouseRepository) {}
  async handle(event: WarehouseCreatedDomainEvent) {
    this.logger.log(
      `Warehouse Created Integration Event: ${JSON.stringify(event)}`,
    );

    const inventoryWarehouse = InventoryWarehouse.create(event.warehouseId);
    await this.repository.createWarehouse(inventoryWarehouse);
  }
}
