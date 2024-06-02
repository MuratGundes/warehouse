import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Role, Roles, RolesGuard } from 'libs/api';
import { CommandBus } from '@nestjs/cqrs';
import { CustomerDto } from '../application/customer.dto';
import { CreateCustomerCommand } from '../application/create-customer/create-customer.command';

@Controller('customer')
@UseGuards(RolesGuard)
export class CustomerController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':id/create')
  @Roles(Role.CREATE_CUSTOMER)
  async createCustomer(
    @Param('id') id: string,
    @Body(ValidationPipe) customerDto: CustomerDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new CreateCustomerCommand(
        id,
        customerDto.name,
        customerDto.surname,
        customerDto.companyName,
        customerDto.email,
      ),
    );
  }
}
