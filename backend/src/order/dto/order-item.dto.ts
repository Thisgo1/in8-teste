import { IsNotEmpty } from "class-validator";

export class OrderItemDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  provider: "BRASILIAN" | "EUROPEAN";
}
