import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'libs/api/roles.decorator';
import { Role } from 'libs/api/role.enum';
import { RolesGuard } from 'libs/api/roles.guard';
import { ProductDto } from '../application/product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../application/create-product/create-product.command';
import { GetProductByIdQuery } from '../application/get-product-by-id/get-product-by-id.query';
import { GetProductsQuery } from '../application/get-products/get-products.query';

//TODO: Documentation needs to be updated
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('healthcheck')
  public checkHealth(): boolean {
    //TODO: Use terminus for healthcheck
    return true;
  }

  @Post(':id/create')
  @Roles(Role.CREATE_PRODUCT)
  async createProduct(
    @Param('id') id: string,
    @Body(ValidationPipe) productDto: ProductDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new CreateProductCommand(
        id,
        productDto.name,
        productDto.unit,
        productDto.isHazardous,
      ),
    );
  }

  @Get()
  @Roles(Role.GET_PRODUCTS)
  async getAll(): Promise<Array<ProductDto>> {
    return this.queryBus.execute(new GetProductsQuery());
  }

  @Get('/:id')
  @Roles(Role.GET_PRODUCT)
  async getById(@Param('id') id: string): Promise<ProductDto> {
    return this.queryBus.execute(new GetProductByIdQuery(id));
  }
}
