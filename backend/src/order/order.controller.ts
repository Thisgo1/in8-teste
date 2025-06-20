import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { OrderService } from "./order.service";
import { GetUser } from "src/auth/decorator";
import { CreateOrderDto } from "./dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";

@UseGuards(JwtGuard)
@Controller("orders")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@GetUser("id") userId: number, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(userId, dto);
  }

  @Get()
  getOrders(@GetUser("id") userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @Get(":id")
  getOrder(@GetUser("id") userId: number, @Param("id") orderId: number) {
    return this.orderService.getOrderById(orderId, userId);
  }

  @Put(":id/status")
  updateStatus(
    @GetUser("id") userId: number,
    @Param("id") orderId: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, userId, dto);
  }

  @Put(":id/cancel")
  cancelOrder(@GetUser("id") userId: number, @Param("id") orderId: number) {
    return this.orderService.cancelOrder(orderId, userId)
  }
}
