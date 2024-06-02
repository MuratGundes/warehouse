import { IDomainEvent } from './domain-event';

export abstract class BaseEntity {
  private _domainEvents: IDomainEvent[] = [];

  get domainEvents(): IDomainEvent[] {
    return [...this._domainEvents];
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }

  protected raise(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
  }
}
