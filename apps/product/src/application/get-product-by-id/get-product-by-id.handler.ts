import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { Product } from '../../domain/product.entity';
import { GetProductByIdQuery } from './get-product-by-id.query';
import { ProductRepository } from '../../infrastructure/product.repository';
import { ProductDto } from '../product.dto';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler implements IQueryHandler<GetProductByIdQuery>
{
  private readonly logger = new Logger(GetProductByIdHandler.name);
  constructor(private readonly repository: ProductRepository) {}

  async execute(query: GetProductByIdQuery): Promise<ProductDto> {
    this.logger.log(`Get Product By Id: ${JSON.stringify(query)}`);
    const product: Product = await this.repository.getById(query.productId);

    if (!product) {
      throw new Error('Product not found');
    }
    return this.mapProductToDto(product);
  }

  private mapProductToDto(product: Product): ProductDto {
    return {
      name: product.name,
      unit: product.unit,
      isHazardous: product.isHazardous,
    };
  }
}
