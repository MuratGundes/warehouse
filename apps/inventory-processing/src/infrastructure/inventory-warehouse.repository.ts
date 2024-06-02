import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InventoryWarehouse } from '../domain/inventory-warehouse/inventory-warehouse.entity';

@Injectable()
export class InventoryWarehouseRepository extends Repository<InventoryWarehouse> {
  constructor(private dataSource: DataSource) {
    super(InventoryWarehouse, dataSource.createEntityManager());
  }
  async getById(warehouseId: any): Promise<InventoryWarehouse> {
    return this.findOne({ where: { warehouseId } });
  }

  async getAll(): Promise<Array<InventoryWarehouse>> {
    return this.find();
  }

  async createWarehouse(warehouse: InventoryWarehouse): Promise<void> {
    await this.save(warehouse);
  }

  async updateWarehouse(warehouse: InventoryWarehouse): Promise<void> {
    await this.save(warehouse);
  }
}
