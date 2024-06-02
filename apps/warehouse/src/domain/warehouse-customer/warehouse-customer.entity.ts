import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

// Materialized View For Customer
@Entity()
@ObjectType({ description: 'WarehouseCustomer' })
export class WarehouseCustomer {
  private constructor(customerId: string, syncedAtUtc: Date) {
    this.customerId = customerId;
    this.syncedAt = syncedAtUtc;
  }

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public readonly id: number;

  @Column()
  @Field(() => String)
  public readonly customerId: string;

  @CreateDateColumn()
  @Field(() => Date)
  public readonly syncedAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  @Field(() => Date)
  public readonly updatedAt: Date;

  @OneToMany(() => Warehouse, (warehouse) => warehouse.customer)
  @Field(() => [Warehouse])
  warehouses: Warehouse[];

  public static create(customerId: string): WarehouseCustomer {
    return new WarehouseCustomer(customerId, new Date());
  }
}
