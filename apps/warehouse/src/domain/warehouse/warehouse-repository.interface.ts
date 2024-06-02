import { IRepository } from 'libs/infrastructure';
import { Warehouse } from './warehouse.entity';
export interface IWarehouseRepository extends IRepository<Warehouse> {}
