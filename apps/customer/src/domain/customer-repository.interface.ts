import { IRepository } from 'libs/infrastructure';
import { Customer } from './customer.entity';
export interface ICustomerRepository extends IRepository<Customer> {
  createCustomer(aggregate: Customer): Promise<void>;
  getByEmail(email: string): Promise<Customer>;
}
