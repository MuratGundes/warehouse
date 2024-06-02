import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Warehouse } from '../domain/warehouse/warehouse.entity';

@Injectable()
export class WarehouseRepository extends Repository<Warehouse> {
  constructor(private dataSource: DataSource) {
    super(Warehouse, dataSource.createEntityManager());
  }
  async getById(id: any): Promise<Warehouse> {
    return this.findOne({ where: { id } });
  }

  async getAll(): Promise<Array<Warehouse>> {
    return this.find();
  }

  async getByCustomerId(customerId: string): Promise<Array<Warehouse>> {
    return this.find({ where: { customer: { customerId } } });
  }
}
