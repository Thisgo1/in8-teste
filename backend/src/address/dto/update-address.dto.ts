import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateAddressDto {
  @IsString()
  street?: string;

  @IsString()
  city?: string;

  @IsString()
  complement?: string;

  @IsNumber()
  number?: number;

  @IsString()
  state?: string;

  @IsString()
  postalCode?: string;

  @IsString()
  country?: string;

  @IsBoolean()
  isDefault?: boolean;
}
