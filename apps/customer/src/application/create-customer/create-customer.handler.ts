import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateCustomerCommand } from './create-customer.command';
import { CustomerRepository } from '../../infrastructure/customer.repository';
import { Customer } from '../../domain/customer.entity';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand>
{
  private readonly logger = new Logger(CreateCustomerHandler.name);
  constructor(
    private readonly repository: CustomerRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateCustomerCommand) {
    this.logger.log(`Creating Customer: ${JSON.stringify(command)}`);

    const { customerId, name, surname, companyName, email } = command;
    let customer: Customer = await this.repository.getById(customerId);

    if (!customer) {
      customer = Customer.create(customerId, name, surname, companyName, email);
    } else {
      customer = this.publisher.mergeObjectContext(customer);
    }

    await this.repository.createCustomer(customer);
    customer.commit();
  }
}
