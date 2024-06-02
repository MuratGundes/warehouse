import { IEvent } from '@nestjs/cqrs';

export class ShipmentProcessedEvent implements IEvent {
  constructor(
    public readonly warehouseId: number,
    public readonly productId: string,
    public readonly size: number,
  ) {}
}
