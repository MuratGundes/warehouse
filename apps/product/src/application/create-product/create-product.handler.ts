import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateProductCommand } from './create-product.command';
import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../../infrastructure/product.repository';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand>
{
  private readonly logger = new Logger(CreateProductHandler.name);
  constructor(
    private readonly repository: ProductRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateProductCommand) {
    this.logger.log(`Creating Product: ${JSON.stringify(command)}`);

    const { productId, productName, productSize, isHazardous } = command;
    let product: Product = await this.repository.getById(productId);

    if (!product) {
      product = Product.create(
        productId,
        productName,
        productSize,
        isHazardous,
      );
    } else {
      product = this.publisher.mergeObjectContext(product);
    }
    await this.repository.createProduct(product);
    product.commit();
  }
}
