import { ProviderType } from "@prisma/client";

export class ProductDto {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  provider: ProviderType;
  detail?: Record<string, any>;
}

