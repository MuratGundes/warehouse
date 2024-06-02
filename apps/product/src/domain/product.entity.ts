import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { ProductCreatedDomainEvent } from '../integrations/product-created.domain.event';
import { ProductUpdatedDomainEvent } from '../integrations/product-updated.domain.event';

@Entity()
export class Product extends AggregateRoot {
  private constructor(
    id: string,
    name: string,
    unit: number,
    isHazardous: boolean,
    createdAtUtc: Date,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.isHazardous = isHazardous;
    this.created_at = createdAtUtc;
  }

  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public readonly name: string;

  @Column()
  public unit: number;

  @Column()
  public isHazardous: boolean;

  @CreateDateColumn()
  public readonly created_at: Date;

  public static create(
    id: string,
    name: string,
    unit: number,
    isHazardous: boolean,
  ): Product {
    const product = new Product(id, name, unit, isHazardous, new Date());
    product.apply(new ProductCreatedDomainEvent(product.id, unit, isHazardous));

    return product;
  }

  public update(unit: number, isHazardous: boolean) {
    this.unit = unit;
    this.isHazardous = isHazardous;

    this.apply(new ProductUpdatedDomainEvent(this.id, unit, isHazardous));
  }
}
