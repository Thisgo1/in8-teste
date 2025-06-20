import { Injectable } from "@nestjs/common";
import { ProductDto } from "src/providers/dtos";
import { ProvidersService } from "src/providers/providers.service";
import { ProviderType } from "@prisma/client";
import { ProductSnapshotService } from "./product-snapshot.service";

@Injectable()
export class ProductsService {
  constructor(
    private providersService: ProvidersService,
    private snapshotService: ProductSnapshotService,
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
}
