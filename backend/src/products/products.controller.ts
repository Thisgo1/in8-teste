import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { ProviderType } from "@prisma/client";
import { ProductsService } from "./products.service";
import { CreateRatingDto } from "./dto";
import { GetUser } from "src/auth/decorator";
import { PrismaService } from "nestjs-prisma";

@UseGuards(JwtGuard)
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService, private prisma: PrismaService) {}

  @Get()
  async getAllProducts(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.productsService.getAllProducts(page, limit);
  }

  @Get(":provider/:id")
  async getProductById(
    @Param("provider", new ParseEnumPipe(ProviderType)) provider: ProviderType,
    @Param("id") id: string,
  ) {
    return this.productsService.getProductById(provider, id);
  }

  @Get("search")
  async searchProducts(@Query("q") query: string) {
    return this.productsService.searchProducts(query);
  }

  @Get(":provider/:id/history")
  async getProductHistory(
    @Param("provider", new ParseEnumPipe(ProviderType)) provider: ProviderType,
    @Param("id") id: string,
  ) {
    return this.productsService.getProductHistory(id, provider);
  }

  @Get("compare/:orderItemId")
  async compareWithCurrent(@Param("orderItemId") orderItemId: number) {
    return this.productsService.compareWithCurrent(orderItemId);
  }

  @Post(":provider/:id/rate")
  async rateProduct(
    @Param("provider", new ParseEnumPipe(ProviderType)) provider: ProviderType,
    @Param("id") productId: string,
    @Body() dto: CreateRatingDto,
    @GetUser("id") userId: number,
  ) {
    // Verifica se o usuário comprou o produto (simplificado)
    const hasPurchased = await this.prisma.orderItem.findFirst({
      where: {
        productId,
        provider,
        order: { userId },
      },
    });

    if (!hasPurchased) {
      throw new ForbiddenException(
        "Você precisa comprar o produto para avaliar",
      );
    }

    return this.productsService.rateProduct({
      productId,
      provider,
      userId,
      rating: dto.rating,
      comment: dto.comment,
    });
  }

  @Get(':productId/ratings')
  async getRatings(
    @Param('productId') productId: string,
    @Query('provider') provider: ProviderType
  ) {
    return this.productsService.getProductRatings(productId, provider);
  }
}
