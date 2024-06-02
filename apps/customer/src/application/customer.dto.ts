import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class CustomerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(80)
  surname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(80)
  companyName: string;

  @IsEmail()
  email: string;
}
