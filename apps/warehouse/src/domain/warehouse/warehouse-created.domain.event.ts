import { IEvent } from '@nestjs/cqrs';

export class WarehouseCreatedDomainEvent implements IEvent {
  constructor(public readonly warehouseId: number) {}
}
