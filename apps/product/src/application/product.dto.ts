import {
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  Min,
} from "class-validator";

export class ProductDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @IsNumber()
  @Min(1)
  unit: number;

  @IsBoolean()
  isHazardous: boolean;
}
