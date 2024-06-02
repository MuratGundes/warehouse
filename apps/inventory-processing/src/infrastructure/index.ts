import { ShipmentRepository } from './shipment.repository';
import { InventoryWarehouseRepository } from './inventory-warehouse.repository';
import { InventoryProductRepository } from './inventory-product.repository';
import { InventoryRepository } from "./inventory.repository";

export const Repositories = [
  ShipmentRepository,
  InventoryRepository,
  InventoryWarehouseRepository,
  InventoryProductRepository,
];
