import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/customer.entity';
import { ICustomerRepository } from '../domain/customer-repository.interface';

@Injectable()
export class CustomerRepository extends Repository<Customer> implements ICustomerRepository
{
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  getById(id: any): Promise<Customer> {
    return this.findOne({ where: { id } });
  }
  getAll(): Promise<Customer[]> {
    return this.find();
  }

  getByEmail(email: string): Promise<Customer> {
    return this.findOne({ where: { email } });
  }

  async createCustomer(customer: Customer): Promise<void> {
    await this.save(customer);
  }
}
