import { IRepository } from 'libs/infrastructure';
import { Shipment } from './shipment.entity';
export interface IShipmentRepository extends IRepository<Shipment> {
  createShipment(aggregate: Shipment): Promise<void>;
}
