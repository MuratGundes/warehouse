import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { WarehouseCustomer } from '../warehouse-customer/warehouse-customer.entity';
import { WarehouseInventory } from '../warehouse-inventory/warehouse-inventory.entity';
import { WarehouseCreatedDomainEvent } from './warehouse-created.domain.event';

@Entity()
@ObjectType({ description: 'Warehouse' })
export class Warehouse extends AggregateRoot {
  private constructor(
    name: string,
    location: string,
    capacity: number,
    isActive: boolean,
    customer: WarehouseCustomer,
    createdAtUtc: Date,
  ) {
    super();
    this.name = name;
    this.location = location;
    this.capacity = capacity;
    this.isActive = isActive;
    this.customer = customer;
    this.created_at = createdAtUtc;
  }

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public readonly id: number;

  @Column()
  @Field(() => String)
  public readonly name: string;

  @Column()
  @Field(() => String)
  public readonly location: string;

  @Column()
  @Field(() => Int)
  public readonly capacity: number;

  @Column()
  @Field(() => Boolean)
  public readonly isActive: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  public readonly created_at: Date;

  @ManyToOne(() => WarehouseCustomer, (customer) => customer.warehouses, {
    cascade: true,
  })
  @JoinColumn({ name: 'customerId' })
  @Field(() => WarehouseCustomer)
  customer: WarehouseCustomer;

  @OneToMany(() => WarehouseInventory, (inventory) => inventory.warehouse)
  @Field(() => [WarehouseInventory])
  inventories: WarehouseInventory[];

  public static create(
    name: string,
    location: string,
    capacity: number,
    isActive: boolean,
    customer: WarehouseCustomer,
  ): Warehouse {
    const warehouse = new Warehouse(
      name,
      location,
      capacity,
      isActive,
      customer,
      new Date(),
    );
    //TODO: WarehouseId has not been created, therefore it will not work.
    warehouse.apply(new WarehouseCreatedDomainEvent(warehouse.id));

    return warehouse;
  }

  public addInventoryItem(item: WarehouseInventory) {
    this.inventories.push(item);
  }
}
