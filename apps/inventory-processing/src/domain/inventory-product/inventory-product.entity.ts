import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { Shipment } from '../shipment/shipment.entity';

// Materialized View For Product
@Entity()
export class InventoryProduct {
  private constructor(
    productId: string,
    unit: number,
    isHazardous: boolean,
    syncedAtUtc: Date,
  ) {
    this.productId = productId;
    this.unit = unit;
    this.isHazardous = isHazardous;
    this.syncedAt = syncedAtUtc;
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly productId: string;

  @Column()
  public unit: number;

  @Column()
  public isHazardous: boolean;

  @CreateDateColumn()
  public syncedAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  public updatedAt: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];

  @OneToMany(() => Shipment, (shipment) => shipment.product)
  shipments: Shipment[];

  public static create(
    productId: string,
    size: number,
    isHazardous: boolean,
  ): InventoryProduct {
    return new InventoryProduct(productId, size, isHazardous, new Date());
  }

  public update(unit: number, isHazardous: boolean): void {
    this.unit = unit;
    this.isHazardous = isHazardous;
    this.updatedAt = new Date();
  }
}
