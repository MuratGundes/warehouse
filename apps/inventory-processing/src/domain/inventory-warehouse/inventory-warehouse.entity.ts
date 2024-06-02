import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { Shipment } from '../shipment/shipment.entity';

// Materialized View For Warehouse
@Entity()
export class InventoryWarehouse {
  private constructor(warehouseId: number, syncedAtUtc: Date) {
    this.warehouseId = warehouseId;
    this.syncedAt = syncedAtUtc;
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly warehouseId: number;

  @CreateDateColumn()
  public syncedAt: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.warehouse)
  inventories: Inventory[];

  @OneToMany(() => Shipment, (shipment) => shipment.warehouse)
  shipments: Shipment[];

  public static create(warehouseId: number): InventoryWarehouse {
    return new InventoryWarehouse(warehouseId, new Date());
  }
}
