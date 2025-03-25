
import { ReactNode } from "react";


export interface StockStatusInfo {
  message: string;
  className: string; 
  icon: ReactNode; 
}


export type CategoryMapping = Record<string, string>;


export class ProductService {

  static getCategoryPath(category?: string): string {
    if (!category) return "";

    const categoryMap: CategoryMapping = {
      Cabelos: "cabelos",
      "Skin Care": "skincare",
      Maquiagem: "maquiagem",
      Perfumes: "perfumes",
      Corpo: "corpo",
    };

    return categoryMap[category] || "";
  }


  static getCategoryDisplayName(categoryPath: string): string {
    const displayNameMap: CategoryMapping = {
      cabelos: "Cabelos",
      skincare: "Skin Care",
      maquiagem: "Maquiagem",
      perfumes: "Perfumes",
      corpo: "Corpo",
    };

    return displayNameMap[categoryPath] || categoryPath;
  }


  static calculateDiscountedPrice(
    originalPrice: string,
    isPromotion: boolean = false,
    discountPercentage: number = 10
  ): string | null {
    if (!originalPrice || !isPromotion) return null;

    const priceValue = parseFloat(
      originalPrice.replace("R$ ", "").replace(",", ".")
    );

    const discountedValue = priceValue * (1 - discountPercentage / 100);

    return discountedValue.toFixed(2).replace(".", ",");
  }
}

export default ProductService;
