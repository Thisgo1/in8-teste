export class EuropeanProductDto {
  name: string;
  description: string;
  price: string;
  gallery: string[];
  discountValue: string;
  hasDiscount: boolean;
  details: {
    adjective: string;
    material: string;
  };
  id: string;
}
