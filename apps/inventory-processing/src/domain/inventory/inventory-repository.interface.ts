import { IRepository } from 'libs/infrastructure';
import { Inventory } from "./inventory.entity";
export interface IInventoryRepository extends IRepository<Inventory> {
  createInventory(aggregate: Inventory): Promise<void>;
}
