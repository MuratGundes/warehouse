import { Product } from '../domain/product.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../domain/product-repository.interface';

@Injectable()
export class ProductRepository
  extends Repository<Product>
  implements IProductRepository
{
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
  async getById(id: any): Promise<Product> {
    return this.findOne({ where: { id } });
  }

  async getAll(): Promise<Array<Product>> {
    return this.find();
  }

  async createProduct(product: Product): Promise<void> {
    await this.save(product);
  }

  async updateProduct(product: Product): Promise<void> {
    await this.update(product.id, product);
  }
}
