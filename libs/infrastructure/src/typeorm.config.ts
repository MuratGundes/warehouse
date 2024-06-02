import { Injectable } from '@nestjs/common';
import { Product } from '../../../apps/product/src/domain/product.entity';
import { Warehouse } from '../../../apps/warehouse/src/domain/warehouse/warehouse.entity';
import { Customer } from '../../../apps/customer/src/domain/customer.entity';
import { WarehouseCustomer } from '../../../apps/warehouse/src/domain/warehouse-customer/warehouse-customer.entity';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Inventory } from "../../../apps/inventory-processing/src/domain/inventory/inventory.entity";
import { Shipment } from "../../../apps/inventory-processing/src/domain/shipment/shipment.entity";
import {
  InventoryWarehouse
} from "../../../apps/inventory-processing/src/domain/inventory-warehouse/inventory-warehouse.entity";
import {
  InventoryProduct
} from "../../../apps/inventory-processing/src/domain/inventory-product/inventory-product.entity";
import { WarehouseInventory } from "../../../apps/warehouse/src/domain/warehouse-inventory/warehouse-inventory.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  //TODO: Read it from config
  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: 'warehouse-postgres',
      port: 5432,
      username: 'warehouse',
      password: 'postgres',
      database: 'warehouse',
      entities: [Product, Warehouse, Customer, Inventory, Shipment, InventoryWarehouse, InventoryProduct, WarehouseCustomer, WarehouseInventory],
      synchronize: true, //TODO: Set to false in production
    };
  }
}
