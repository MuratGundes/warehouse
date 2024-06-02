import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Warehouse } from '../domain/warehouse/warehouse.entity';
import { WarehouseService } from '../domain/warehouse/warehouse.service';
import { WarehouseDto } from './warehouse.dto';

@Resolver(() => Warehouse)
export class WarehouseResolver {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Query(() => [Warehouse])
  async getWarehouses(): Promise<Warehouse[]> {
    return this.warehouseService.findAll();
  }

  @Query(() => Warehouse)
  async getWarehouseById(
    @Args('warehouseId') warehouseId: number,
  ): Promise<Warehouse> {
    const warehouse = await this.warehouseService.findOne(warehouseId);

    if (!warehouse) {
      throw new NotFoundException(warehouseId);
    }

    return warehouse;
  }

  @Query(() => [Warehouse])
  async getWarehouseByCustomerId(
    @Args('customerId') customerId: string,
  ): Promise<Warehouse[]> {
    return this.warehouseService.findAllByCustomerId(customerId);
  }

  @Mutation(() => Warehouse)
  async createWarehouse(
    @Args('warehouseDto') warehouseDto: WarehouseDto,
  ): Promise<Warehouse> {
    return this.warehouseService.create(warehouseDto);
  }
}
