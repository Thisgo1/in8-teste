import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ProviderType } from "@prisma/client";
import { BrazilianProductDto, EuropeanProductDto, ProductDto } from "./dtos";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ProvidersService {
  private readonly PROVIDERS = {
    [ProviderType.BRASILIAN]:
      "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider",
    [ProviderType.EUROPEAN]:
      "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider",
  };
  constructor(private HttpService: HttpService) {}

  private normalizeBrazilianProduct(product: BrazilianProductDto) {
    return {
      id: product.id,
      name: product.nome,
      price: parseFloat(product.preco),
      description: product.descricao,
      image: product.imagem,
      provider: ProviderType.BRASILIAN,
      details: {
        material: product.material,
        category: product.categoria,
        departament: product.departamento,
      },
    };
  }

  private normalizeEuropeanProduct(product: EuropeanProductDto) {
    return {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      image: product.gallery[0],
      provider: ProviderType.EUROPEAN,
      details: {
        ...product.details,
        hasDiscount: product.hasDiscount,
        discountValue: parseFloat(product.discountValue),
      },
    };
  }

  async getProductsByProvider(provider: ProviderType): Promise<ProductDto[]> {
    try {
      const response = await firstValueFrom(
        this.HttpService.get(this.PROVIDERS[provider]),
      );

      return provider === ProviderType.BRASILIAN
        ? response.data.map((product: BrazilianProductDto) =>
            this.normalizeBrazilianProduct(product),
          )
        : response.data.map((product: EuropeanProductDto) =>
            this.normalizeEuropeanProduct(product),
          );
    } catch (error) {
      throw new Error(`Falha ao buscar ${provider} products: ${error.message}`);
    }
  }

  async getProductById(
    provider: ProviderType,
    productId: string,
  ): Promise<ProductDto> {
    try {
      const response = await firstValueFrom(
        this.HttpService.get(`${this.PROVIDERS[provider]}/${productId}`),
      );

      return provider === ProviderType.BRASILIAN
        ? this.normalizeBrazilianProduct(response.data)
        : this.normalizeEuropeanProduct(response.data);
    } catch (error) {
      throw new Error(
        `Falha ao obter produto ${productId} de ${provider}: ${error.message}`,
      );
    }
  }

  async getAllProducts(): Promise<ProductDto[]>{
    try { const [brazilianProducts, europeanProducts] = await Promise.all([
      this.getProductsByProvider(ProviderType.BRASILIAN),
      this.getProductsByProvider(ProviderType.EUROPEAN),
    ])
      return [...brazilianProducts, ...europeanProducts];
    }catch(error){
      throw new Error(`Falha ao buscar todos os produtos: ${error.message}`)
    }
  }
}
