import { IEvent } from '@nestjs/cqrs';

export class ProductUpdatedDomainEvent implements IEvent {
  constructor(
    public readonly productId: string,
    public readonly unit: number,
    public readonly isHazardous: boolean,
  ) {}
}
