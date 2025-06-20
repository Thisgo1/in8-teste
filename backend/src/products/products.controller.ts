import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { ProviderType } from "@prisma/client";
import { ProductsService } from "./products.service";

@UseGuards(JwtGuard)
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

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
}
