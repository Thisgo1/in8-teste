import { Injectable } from "@nestjs/common";
import { ProductDto } from "src/providers/dtos";
import { ProvidersService } from "src/providers/providers.service";
import { ProviderType } from "@prisma/client";
import { ProductSnapshotService } from "./product-snapshot.service";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ProductsService {
  constructor(
    private providersService: ProvidersService,
    private snapshotService: ProductSnapshotService,
    private readonly prisma: PrismaService,
  ) {}

  async getAllProducts(page: number = 1, limit: number = 10) {
    const allProducts = await this.providersService.getAllProducts();

    //paginação
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = allProducts.slice(start, end);

    return {
      data: paginatedProducts,
      meta: {
        total: allProducts.length,
        page,
        limit,
        totalPages: Math.ceil(allProducts.length / limit),
      },
    };
  }

  async getProductById(provider: ProviderType, id: string) {
    return this.providersService.getProductById(provider, id);
  }

  async searchProducts(query: string) {
    const allProducts = await this.providersService.getAllProducts();
    const normalizedQuery = query.toLowerCase().trim();

    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        (product.description &&
          product.description.toLowerCase().includes(normalizedQuery)),
    );
  }

  async getProductHistory(productId: string, provider: ProviderType) {
    return this.snapshotService.getProductHistory(productId, provider);
  }

  async compareWithCurrent(orderItemId: number) {}

  async rateProduct(params: {
    productId: string;
    provider: ProviderType;
    userId: number;
    rating: number;
    comment?: string;
  }) {
    const { productId, provider, userId, rating, comment } = params;

    // Upsert (cria ou atualiza avaliação existente)
    const ratingRecord = await this.prisma.productRating.upsert({
      where: {
        productId_provider_userId: {
          productId,
          provider,
          userId,
        },
      },
      create: {
        productId,
        provider,
        userId,
        rating,
        comment,
      },
      update: {
        rating,
        comment,
      },
    });

    // Atualiza cache de ratings no ProductSnapshot (opcional)
    await this.updateProductRatingStats(productId, provider);

    return ratingRecord;
  }
  async getProductRatings(productId: string, provider: ProviderType) {
    return this.prisma.productRating.findMany({
      where: {
        productId,
        provider,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  private async updateProductRatingStats(
    productId: string,
    provider: ProviderType,
  ) {
    const stats = await this.prisma.productRating.aggregate({
      where: { productId, provider },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.productSnapshot.updateMany({
      where: { productId, provider },
      data: {
        averageRating: stats._avg.rating,
        ratingCount: stats._count.rating,
      },
    });
  }
}
