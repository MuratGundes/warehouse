import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryProduct } from '../inventory-product/inventory-product.entity';
import { InventoryWarehouse } from '../inventory-warehouse/inventory-warehouse.entity';
import { InventoryCreatedDomainEvent } from "./inventory-created.domain.event";
import { AggregateRoot } from '@nestjs/cqrs';

@Entity()
export class Inventory extends AggregateRoot {
  private constructor(
    warehouse: InventoryWarehouse,
    product: InventoryProduct,
    size: number,
    createdAtUtc: Date) {
    super();
    this.warehouse = warehouse;
    this.product = product;
    this.size = size;
    this.created_at = createdAtUtc;
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public size: number;

  @CreateDateColumn()
  public readonly created_at: Date;

  @ManyToOne(() => InventoryProduct, (product) => product.inventories, {
    cascade: true,
  })
  @JoinColumn({ name: 'productId' })
  product: InventoryProduct;

  @ManyToOne(() => InventoryWarehouse, (warehouse) => warehouse.inventories, {
    cascade: true,
  })
  @JoinColumn({ name: 'warehouseId' })
  warehouse: InventoryWarehouse;

  public static create(
    warehouse: InventoryWarehouse,
    product: InventoryProduct,
    size: number): Inventory {
    const inventory = new Inventory(warehouse, product, size, new Date());
    inventory.apply(new InventoryCreatedDomainEvent(warehouse.warehouseId, inventory.id));

    return inventory;
  }
}
