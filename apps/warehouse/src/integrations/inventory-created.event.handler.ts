import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Logger, NotFoundException } from "@nestjs/common";
import {
  InventoryCreatedDomainEvent
} from "../../../inventory-processing/src/domain/inventory/inventory-created.domain.event";
import { WarehouseRepository } from "../infrastructure/warehouse.repository";
import { WarehouseInventory } from "../domain/warehouse-inventory/warehouse-inventory.entity";

@EventsHandler(InventoryCreatedDomainEvent)
export class InventoryCreatedEventHandler implements IEventHandler<InventoryCreatedDomainEvent>
{
  private readonly logger = new Logger(InventoryCreatedEventHandler.name);
  constructor(private readonly repository: WarehouseRepository,) {}
  async handle(event: InventoryCreatedDomainEvent) {
    this.logger.log(
      `Inventory Created Integration Event: ${JSON.stringify(event)}`,
    );

    const warehouse = await this.repository.getById(event.warehouseId);
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with id ${event.warehouseId} not found`);
    }

    const warehouseInventory = WarehouseInventory.create(event.inventoryId);
    warehouse.addInventoryItem(warehouseInventory);
    await this.repository.update(warehouse.id, warehouse);
  }
}
