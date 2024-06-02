import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Inventory } from "../domain/inventory/inventory.entity";
import { IInventoryRepository } from "../domain/inventory/inventory-repository.interface";

@Injectable()
export class InventoryRepository extends Repository<Inventory> implements IInventoryRepository
{
  constructor(private dataSource: DataSource) {
    super(Inventory, dataSource.createEntityManager());
  }
  async getById(id: any): Promise<Inventory> {
    return this.findOne({ where: { id } });
  }

  async getAll(): Promise<Array<Inventory>> {
    return this.find();
  }

  async createInventory(inventory: Inventory): Promise<void> {
    await this.save(inventory);
  }
}
