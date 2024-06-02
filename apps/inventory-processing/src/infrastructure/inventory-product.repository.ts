import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InventoryProduct } from '../domain/inventory-product/inventory-product.entity';

@Injectable()
export class InventoryProductRepository extends Repository<InventoryProduct> {
  constructor(private dataSource: DataSource) {
    super(InventoryProduct, dataSource.createEntityManager());
  }
  async getById(productId: any): Promise<InventoryProduct> {
    return this.findOne({ where: { productId } });
  }

  async getAll(): Promise<Array<InventoryProduct>> {
    return this.find();
  }

  async createProduct(product: InventoryProduct): Promise<void> {
    await this.save(product);
  }
}
