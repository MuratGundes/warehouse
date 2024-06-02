import { CreateProductHandler } from './create-product/create-product.handler';
import { GetProductsHandler } from './get-products/get-products.handler';
import { GetProductByIdHandler } from './get-product-by-id/get-product-by-id.handler';
import { UpdateProductHandler } from './update-product/update-product.handler';

export const Handlers = [
  CreateProductHandler,
  GetProductsHandler,
  GetProductByIdHandler,
  UpdateProductHandler,
];
