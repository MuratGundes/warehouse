import { Product } from './product.entity';
import { IRepository } from 'libs/infrastructure';
export interface IProductRepository extends IRepository<Product> {
  createProduct(aggregate: Product): Promise<void>;
  updateProduct(aggregate: Product): Promise<void>;
}
