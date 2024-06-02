import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { WarehouseCustomer } from '../domain/warehouse-customer/warehouse-customer.entity';

@Injectable()
export class WarehouseCustomerRepository extends Repository<WarehouseCustomer> {
  constructor(private dataSource: DataSource) {
    super(WarehouseCustomer, dataSource.createEntityManager());
  }
  async getById(id: any): Promise<WarehouseCustomer> {
    return this.findOne({ where: { id } });
  }

  async getAll(): Promise<Array<WarehouseCustomer>> {
    return this.find();
  }

  async createCustomer(customer: WarehouseCustomer): Promise<void> {
    await this.save(customer);
  }
}
