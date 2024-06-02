import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';

@InputType()
export class WarehouseDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  location: string;

  @Field()
  @IsNumber()
  capacity: number;

  @Field()
  @IsBoolean()
  isActive: boolean;
}
