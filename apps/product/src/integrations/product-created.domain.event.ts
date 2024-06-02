import { IEvent } from '@nestjs/cqrs';

export class ProductCreatedDomainEvent implements IEvent {
  constructor(
    public readonly productId: string,
    public readonly size: number,
    public readonly isHazardous: boolean,
  ) {}
}
