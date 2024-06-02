import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Logger } from '@nestjs/common';
import { InventoryProduct } from '../domain/inventory-product/inventory-product.entity';
import { InventoryProductRepository } from '../infrastructure/inventory-product.repository';
import { ProductCreatedDomainEvent } from '../../../product/src/integrations/product-created.domain.event';

@EventsHandler(ProductCreatedDomainEvent)
export class ProductCreatedEventHandler implements IEventHandler<ProductCreatedDomainEvent>
{
  private readonly logger = new Logger(ProductCreatedEventHandler.name);
  constructor(private readonly repository: InventoryProductRepository) {}
  async handle(event: ProductCreatedDomainEvent) {
    this.logger.log(
      `Product Created Integration Event: ${JSON.stringify(event)}`,
    );

    const inventoryProduct = InventoryProduct.create(
      event.productId,
      event.size,
      event.isHazardous,
    );
    await this.repository.createProduct(inventoryProduct);
  }
}
