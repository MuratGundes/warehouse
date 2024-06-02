import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UpdateProductCommand } from './update-product.command';
import { ProductRepository } from '../../infrastructure/product.repository';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand>
{
  private readonly logger = new Logger(UpdateProductHandler.name);
  constructor(
    private readonly repository: ProductRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateProductCommand) {
    this.logger.log(`Updating Product: ${JSON.stringify(command)}`);

    const { productId, unit, isHazardous } = command;
    const product = this.publisher.mergeObjectContext(
      await this.repository.getById(productId),
    );
    product.update(unit, isHazardous);

    await this.repository.updateProduct(product);
    product.commit();
  }
}
