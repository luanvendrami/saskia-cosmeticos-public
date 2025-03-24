/**
 * @fileoverview Service for product-related operations
 * This centralizes all product logic like calculating discounts,
 * checking stock status, and other product-related operations
 */

import { ReactNode } from "react";

/**
 * Type for stock status information with message, styling and icon
 */
export interface StockStatusInfo {
  message: string; // Display message about stock
  className: string; // CSS class for styling
  icon: ReactNode; // Icon component to show
}

/**
 * Category mapping record type
 */
export type CategoryMapping = Record<string, string>;

/**
 * Service class for product-related operations
 */
export class ProductService {
  /**
   * Maps category names to their corresponding URL paths
   *
   * @param category - Category name
   * @returns URL path for the category
   */
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

  /**
   * Maps category URL paths to display names
   *
   * @param categoryPath - URL path identifier for the category
   * @returns Display name for the category
   */
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

  /**
   * Calculates the discounted price for a product
   *
   * @param originalPrice - Original price as a string (ex: "R$ 99,90")
   * @param isPromotion - Whether the product is on promotion
   * @param discountPercentage - Discount percentage to apply
   * @returns Formatted discounted price or null if no discount applies
   */
  static calculateDiscountedPrice(
    originalPrice: string,
    isPromotion: boolean = false,
    discountPercentage: number = 10
  ): string | null {
    if (!originalPrice || !isPromotion) return null;

    // Extract numeric value from price string (e.g., "R$ 99,90" -> 99.90)
    const priceValue = parseFloat(
      originalPrice.replace("R$ ", "").replace(",", ".")
    );

    // Apply configured discount
    const discountedValue = priceValue * (1 - discountPercentage / 100);

    // Format back to Brazilian currency format (without R$ prefix)
    return discountedValue.toFixed(2).replace(".", ",");
  }
}

export default ProductService;
