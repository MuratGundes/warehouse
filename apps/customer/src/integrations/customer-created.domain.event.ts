import { IEvent } from '@nestjs/cqrs';

export class CustomerCreatedDomainEvent implements IEvent {
  constructor(public readonly customerId: string) {}
}
