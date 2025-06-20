import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
