import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsEnum,
} from "class-validator";
import { ShipmentType } from 'libs/application/shipment-type.enum';
import { Transform } from "class-transformer";

export class ShipmentDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsEnum(ShipmentType)
  @Transform(({ value }) => String(value) as ShipmentType)
  shipmentType: ShipmentType;

  @Transform( ({ value }) => new Date(value))
  shipmentDate: Date;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
