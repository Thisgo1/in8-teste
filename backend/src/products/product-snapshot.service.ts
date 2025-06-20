import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ProductDto } from "src/providers/dtos";
import { ProviderType } from "@prisma/client";

@Injectable()
export class ProductSnapshotService {
  constructor(private prisma: PrismaService) {}

  async createSnapshot(product: ProductDto) {
    return this.prisma.productSnapshot.create({
      data: {
        productId: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.image,
        provider: product.provider,
      },
    });
  }

  async getProductHistory(productId: string, provider: ProviderType) {
    return this.prisma.productSnapshot.findMany({
      where: { productId, provider },
      orderBy: { createdAt: "desc" },
    });
  }

  async getSnapshotById(snapshotId: string) {
    return this.prisma.productSnapshot.findUnique({
      where: { id: snapshotId },
    });
  }
}
