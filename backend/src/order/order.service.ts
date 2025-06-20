import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateOrderDto, OrderItemDto } from "./dto";

import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { ProvidersService } from "../providers/providers.service";
import { randomUUID } from "crypto";

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private providersService: ProvidersService,
  ) {}

  private generateOrderNumber(): string {
    return `ORD-${randomUUID().substring(0, 8).toUpperCase()}`;
  }

  private calculateTotal(items: OrderItemDto[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private async enrichOrderItems(items: OrderItemDto[]) {
    return Promise.all(
      items.map(async (item) => {
        const product = await this.providersService.getProductById(
          item.provider,
          item.productId,
        );

        if (!product) {
          throw new NotFoundException(
            `Produto ${item.productId} não encontrado no provedor ${item.provider}`,
          );
        }

        if (product.price !== item.price) {
          throw new Error(
            `Preço do produto ${product.name} não corresponde ao preço atual`,
          );
        }

        return {
          ...item,
          name: product.name,
          description: product.description,
          imageUrl: product.image,
        };
      }),
    );
  }

  async createOrder(userId: number, dto: CreateOrderDto) {
    const enrichedItems = await this.enrichOrderItems(dto.items);
    const orderNumber = this.generateOrderNumber();
    const total = this.calculateTotal(enrichedItems);

    return this.prisma.order.create({
      data: {
        orderNumber,
        userId,
        total,
        items: {
          create: enrichedItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            provider: item.provider,
            imageUrl: item.imageUrl,
            description: item.description,
          })),
        },
      },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async getOrderById(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException("Pedido não encontrado");
    }

    return order;
  }

  async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateOrderStatus(
    orderId: number,
    userId: number,
    dto: UpdateOrderStatusDto,
  ) {
    await this.getOrderById(orderId, userId); // Valida a existência e permissão

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: dto.status },
    });
  }

  async cancelOrder(orderId: number, userId: number) {
    const order = await this.getOrderById(orderId, userId);

    if (order.status !== "PENDING") {
      throw new Error("Só é possível cancelar pedidos com status PENDING");
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });
  }
}
