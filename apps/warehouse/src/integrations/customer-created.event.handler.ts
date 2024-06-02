import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Logger } from '@nestjs/common';
import { CustomerCreatedDomainEvent } from '../../../customer/src/integrations/customer-created.domain.event';
import { WarehouseCustomer } from '../domain/warehouse-customer/warehouse-customer.entity';
import { WarehouseCustomerRepository } from '../infrastructure/warehouse-customer.repository';

@EventsHandler(CustomerCreatedDomainEvent)
export class CustomerCreatedEventHandler implements IEventHandler<CustomerCreatedDomainEvent>
{
  private readonly logger = new Logger(CustomerCreatedEventHandler.name);
  constructor(private readonly repository: WarehouseCustomerRepository) {}
  async handle(event: CustomerCreatedDomainEvent) {
    this.logger.log(
      `Customer Created Integration Event: ${JSON.stringify(event)}`,
    );

    const warehouseCustomer = WarehouseCustomer.create(event.customerId);
    await this.repository.createCustomer(warehouseCustomer);
  }
}
