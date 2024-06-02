import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Warehouse } from '../warehouse/warehouse.entity';

// Materialized View For Inventory
@Entity()
@ObjectType({ description: 'WarehouseInventory' })
export class WarehouseInventory {
  private constructor(inventoryId: number, syncedAtUtc: Date) {
    this.inventoryId = inventoryId;
    this.syncedAt = syncedAtUtc;
  }

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public readonly id: number;

  @Column()
  @Field(() => Int)
  public readonly inventoryId: number;

  @CreateDateColumn()
  @Field(() => Date)
  public syncedAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  @Field(() => Date)
  public updatedAt: Date;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventories, {
    cascade: true,
  })
  @JoinColumn({ name: 'warehouseId' })
  @Field(() => Warehouse)
  warehouse: Warehouse;

  public static create(inventoryId: number): WarehouseInventory {
    return new WarehouseInventory(inventoryId, new Date());
  }
}
