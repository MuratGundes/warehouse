import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../../infrastructure/product.repository';
import { GetProductsQuery } from './get-products.query';
import { ProductDto } from '../product.dto';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  private readonly logger = new Logger(GetProductsHandler.name);
  constructor(private readonly repository: ProductRepository) {}

  async execute(query: GetProductsQuery): Promise<Array<ProductDto>> {
    this.logger.log(`Get Products: ${JSON.stringify(query)}`);
    const products: Array<Product> = await this.repository.getAll();

    return this.mapProductsToDto(products);
  }

  private mapProductsToDto(products: Array<Product>): Array<ProductDto> {
    return products.map((product) => {
      return {
        name: product.name,
        unit: product.unit,
        isHazardous: product.isHazardous,
      };
    });
  }
}
