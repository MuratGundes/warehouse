import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IShipmentRepository } from '../domain/shipment/shipment-repository.interface';
import { Shipment } from '../domain/shipment/shipment.entity';

@Injectable()
export class ShipmentRepository extends Repository<Shipment> implements IShipmentRepository
{
  constructor(private dataSource: DataSource) {
    super(Shipment, dataSource.createEntityManager());
  }
  async getById(id: any): Promise<Shipment> {
    return this.findOne({ where: { id } });
  }

  async getAll(): Promise<Array<Shipment>> {
    return this.find();
  }

  async createShipment(shipment: Shipment): Promise<void> {
    await this.save(shipment);
  }
}
