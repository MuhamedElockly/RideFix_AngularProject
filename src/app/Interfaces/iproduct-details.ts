import { IproductRates } from "./iproduct-rates";

export interface IproductDetails {
  averageRating: number;
  totalRatings: number;
  productId: number;
  description: string;
  name: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  productRates:IproductRates[],
  categoryId: number;

    // "productRates": [],

}
