import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsPostalCode,
} from "class-validator";

export class NewAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  street: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  city: string;

  @IsString()
  @Length(0, 200)
  complement?: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  state: string;

  @IsNotEmpty()
  @IsString()
  @IsPostalCode("BR") // Valida CEP brasileiro
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  country: string;

  @IsBoolean()
  isDefault: boolean;
}
