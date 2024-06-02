import { Injectable, Logger } from '@nestjs/common';
import { Warehouse } from './warehouse.entity';
import { WarehouseDto } from '../../api/warehouse.dto';
import { WarehouseRepository } from '../../infrastructure/warehouse.repository';
import { WarehouseCustomerRepository } from '../../infrastructure/warehouse-customer.repository';

@Injectable()
export class WarehouseService {
  private readonly logger = new Logger(WarehouseService.name);
  constructor(
    private readonly warehouseRepository: WarehouseRepository,
    private readonly warehouseCustomerRepository: WarehouseCustomerRepository,
  ) {}

  async create(warehouseDto: WarehouseDto): Promise<Warehouse> {
    this.logger.log(`Creating Warehouse: ${JSON.stringify(warehouseDto)}`);

    const { customerId } = warehouseDto;
    const customer = await this.warehouseCustomerRepository.findOne({
      where: { customerId },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const warehouse = Warehouse.create(
      warehouseDto.name,
      warehouseDto.location,
      warehouseDto.capacity,
      warehouseDto.isActive,
      customer,
    );
    await this.warehouseRepository.save(warehouse);

    return warehouse;
  }

  async findAll(): Promise<Array<Warehouse>> {
    this.logger.log('Get Warehouses');
    return await this.warehouseRepository.getAll();
  }

  async findOne(id: number): Promise<Warehouse> {
    this.logger.log(`Get Warehouse By Id: ${id}`);
    return await this.warehouseRepository.getById(id);
  }

  async findAllByCustomerId(customerId: string): Promise<Array<Warehouse>> {
    this.logger.log(`Get Warehouses By Customer Id: ${customerId}`);
    return await this.warehouseRepository.getByCustomerId(customerId);
  }
}
