import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Logger, NotFoundException } from '@nestjs/common';
import { InventoryProductRepository } from '../infrastructure/inventory-product.repository';
import { ProductUpdatedDomainEvent } from '../../../product/src/integrations/product-updated.domain.event';

@EventsHandler(ProductUpdatedDomainEvent)
export class ProductUpdatedEventHandler implements IEventHandler<ProductUpdatedDomainEvent>
{
  private readonly logger = new Logger(ProductUpdatedEventHandler.name);
  constructor(private readonly repository: InventoryProductRepository) {}
  async handle(event: ProductUpdatedDomainEvent) {
    this.logger.log(
      `Product Updated Integration Event: ${JSON.stringify(event)}`,
    );

    const warehouseProduct = await this.repository.getById(+event.productId);

    if (!warehouseProduct) {
      throw new NotFoundException(
        `Product with id ${event.productId} not found`,
      );
    }

    warehouseProduct.update(event.unit, event.isHazardous);
    await this.repository.update(event.productId, warehouseProduct);
  }
}
