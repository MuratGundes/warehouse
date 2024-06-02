import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerCreatedDomainEvent } from '../integrations/customer-created.domain.event';

@Entity()
export class Customer extends AggregateRoot {
  private constructor(
    id: string,
    name: string,
    surname: string,
    companyName: string,
    email: string,
    createdAtUtc: Date,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.companyName = companyName;
    this.email = email;
    this.created_at = createdAtUtc;
  }

  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public readonly name: string;

  @Column()
  public readonly surname: string;

  @Column()
  public readonly companyName: string;

  @Column()
  public readonly email: string;

  @CreateDateColumn()
  public readonly created_at: Date;

  public static create(
    id: string,
    name: string,
    surname: string,
    companyName: string,
    email: string,
  ): Customer {
    const customer = new Customer(
      id,
      name,
      surname,
      companyName,
      email,
      new Date(),
    );
    customer.apply(new CustomerCreatedDomainEvent(customer.id));

    return customer;
  }
}
