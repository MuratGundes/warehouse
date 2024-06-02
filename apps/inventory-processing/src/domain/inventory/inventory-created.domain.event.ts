import { IEvent } from '@nestjs/cqrs';

export class InventoryCreatedDomainEvent implements IEvent {
  constructor(
    public readonly warehouseId: number,
    public readonly inventoryId: number,
  ) {}
}
