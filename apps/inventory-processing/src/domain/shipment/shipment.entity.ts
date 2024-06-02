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
import { AggregateRoot } from '@nestjs/cqrs';
import { ShipmentType } from './shipment-type.enum';

@Entity()
export class Shipment extends AggregateRoot {
  private constructor(
    warehouse: InventoryWarehouse,
    product: InventoryProduct,
    size: number,
    shipmentType: ShipmentType,
    shipmentDate: Date,
    createdAtUtc: Date,
  ) {
    super();
    this.warehouse = warehouse;
    this.product = product;
    this.size = size;
    this.shipmentType = shipmentType;
    this.shipmentDate = shipmentDate;
    this.created_at = createdAtUtc;
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public size: number;

  @Column({
    type: "enum",
    enum: ShipmentType
  })
  public shipmentType: ShipmentType;

  @Column()
  shipmentDate: Date;

  @CreateDateColumn()
  public readonly created_at: Date;

  @ManyToOne(() => InventoryProduct, (product) => product.shipments, {
    cascade: true,
  })
  @JoinColumn({ name: 'productId' })
  product: InventoryProduct;

  @ManyToOne(() => InventoryWarehouse, (warehouse) => warehouse.shipments, {
    cascade: true,
  })
  @JoinColumn({ name: 'warehouseId' })
  warehouse: InventoryWarehouse;

  public static create(
    warehouse: InventoryWarehouse,
    product: InventoryProduct,
    size: number,
    shipmentType: ShipmentType,
    shipmentDate: Date,
  ): Shipment {
    return new Shipment(
      warehouse,
      product,
      size,
      shipmentType,
      shipmentDate,
      new Date(),
    );
  }
}
